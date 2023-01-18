import mongoose from "mongoose";

const Schema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  {
    timestamp: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);
