import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    google_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", Schema);
