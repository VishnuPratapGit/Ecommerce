import Category from "../models/categories.model.js";
import Product from "../models/produts.model.js";

async function uploadProduct(req, res) {
  try {
    const { name, description, quantity, price, category } = req.body;
    const userId = req.user?._id;

    // validation condition
    if (!userId) {
      return res.status(400).json({ message: "User not found, login first" });
    }
    if (!name || !price || !quantity || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Minimum one image is required" });
    }

    // Extract secure URLs
    const imageUrls = req.files.map((file) => file.path);

    // Prepare product data
    const productData = {
      name,
      description,
      price: Number(price),
      quantity: quantity,
      category,
      sellerId: userId,
      images: imageUrls,
    };

    // Create product in DB
    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      product,
    });
  } catch (error) {
    console.error("Product Registration Failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function getMyProducts(req, res) {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ message: "User not found, login first" });
    }

    const products = await Product.find({ sellerId: userId });

    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Product fething failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();

    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Product fething failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function getCategoryWiseProducts(req, res) {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: {
            $in: [
              "dairy-bread",
              "fruits-vegetables",
              "snacks-munchies",
              "stationery",
            ],
          },
        },
      },
      { $sort: { _id: -1 } },
      {
        $group: {
          _id: "$category",
          products: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          products: { $slice: ["$products", 10] },
        },
      },
    ]);

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Product fething failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function createBulkCategory(req, res) {
  try {
    const categories = req.body; // expecting an array of { title, image }

    if (!Array.isArray(categories) || categories.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid or empty category list." });
    }

    const inserted = await Category.insertMany(categories);

    return res.status(201).json({
      message: "Categories created successfully.",
      data: inserted,
    });
  } catch (error) {
    console.error("Error creating categories:", error);
    return res.status(500).json({
      message: "Failed to create categories.",
      error: error.message,
    });
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();

    return res.status(200).json({
      message: "Categories fetched successfully.",
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      message: "Failed to fetch categories.",
      error: error.message,
    });
  }
}

export {
  uploadProduct,
  getMyProducts,
  getAllProducts,
  getCategoryWiseProducts,
  createBulkCategory,
  getAllCategories,
};
