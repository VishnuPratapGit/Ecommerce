import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Sub-schema for address
const addressSchema = new mongoose.Schema(
  {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    country: { type: String, default: "India" },
  },
  { _id: false }
);

// Sub-schema for bank details
const bankDetailsSchema = new mongoose.Schema(
  {
    accountHolderName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    bankName: { type: String },
    branchName: { type: String },
    upiId: { type: String },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    addresses: [addressSchema],

    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    sellerProfile: {
      storeName: {
        type: String,
        required: function () {
          return this.isSeller;
        },
      },
      businessAddress: addressSchema,
      bankDetails: bankDetailsSchema,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password during login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
