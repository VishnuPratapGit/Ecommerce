import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

function generateAccessToken({ _id, name, email }) {
  return jwt.sign({ _id, name, email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
}

function generateRefreshToken(id) {
  return jwt.sign({ _id: id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
}

async function userSingup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const isDuplicate = await User.findOne({ email });

    if (isDuplicate) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const user = await User.create({ name, email, password });

    const userData = await User.findById(user?._id);

    if (!userData) {
      return res
        .status(400)
        .json({ success: false, message: "User Registration Failed!" });
    }

    res.status(200).send({ success: true, userData });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if password is valid
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token to the user document
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Cookie options
    const isDev = process.env.NODE_ENV !== "production";
    const cookieOptions = {
      httpOnly: true,
      secure: !isDev,
      sameSite: isDev ? "lax" : "none",
    };

    // Exclude sensitive info from response
    const { password: pw, refreshToken: rt, ...safeUser } = user._doc;

    // Send response
    res
      .status(200)
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
      })
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .json({
        success: true,
        message: "Login successful",
        user: safeUser,
      });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function getCurrentUser(req, res) {
  const user = req.user;

  if (!user) {
    return res
      .status(404)
      .json({ status: false, message: "user not logged in!" });
  }

  res.status(200).json(user);
}

async function userLogout(req, res) {
  try {
    if (!req.user?._id) {
      return res.status(400).json({ error: "Invalid user request" });
    }

    // Clear the refresh token in the DB
    await User.findByIdAndUpdate(req.user._id, {
      $unset: { refreshToken: "" },
    });

    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "Strict" : "Lax",
    };

    // Clear cookies and send response
    return res
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .status(200)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json({ error: "Internal server error during logout" });
  }
}

async function becomeSeller(req, res) {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ error: "Invalid user request" });
    }

    const { sellerProfile } = req.body;

    if (
      !sellerProfile ||
      !sellerProfile.storeName ||
      !sellerProfile.businessAddress ||
      !sellerProfile.bankDetails
    ) {
      return res
        .status(400)
        .json({ message: "Incomplete seller information." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isSeller: true,
        sellerProfile: sellerProfile,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User Updation Failed." });
    }

    res.status(200).json({
      message: "Seller profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Become Seller Error:", error);
    res
      .status(500)
      .json({ message: "Server error while updating seller profile." });
  }
}

async function grantNewTokens(req, res) {
  try {
    const token =
      req.cookies?.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: RefreshToken not found" });
    }

    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    if (!payload?._id) {
      return res.status(401).json({ message: "Unauthorized: Invalid token!" });
    }

    const user = await User.findById(payload._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.refreshToken !== token) {
      return res
        .status(403)
        .json({ message: "Refresh token mismatch. Re-login required." });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    // Cookie options
    const isDev = process.env.NODE_ENV !== "production";
    const cookieOptions = {
      httpOnly: true,
      secure: !isDev,
      sameSite: isDev ? "lax" : "none",
    };

    // Send response
    res
      .status(200)
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
      })
      .cookie("refreshToken", newRefreshToken, {
        ...cookieOptions,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .json({
        success: true,
        message: "New token set to cookies successfully",
        accessToken,
        newRefreshToken,
      });
  } catch (error) {
    console.error("Token refresh error:", error);
    return res.status(500).json({ message: error.message });
  }
}

async function addAddress(req, res) {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ error: "Invalid user request" });
    }

    const address = req.body;

    if (!address) {
      return res.status(400).json({ message: "Incomplete address info." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: address } },
      { new: true, runValidators: true }
    ).select("-password -refreshToken");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found or update failed." });
    }

    res
      .status(200)
      .json({ message: "Address added successfully", user: updatedUser });
  } catch (error) {
    console.error("Error in adding address:", error);
    res.status(500).json({ message: "Server error while updating address." });
  }
}

export {
  userSingup,
  userLogin,
  getCurrentUser,
  userLogout,
  grantNewTokens,
  becomeSeller,
  addAddress,
};
