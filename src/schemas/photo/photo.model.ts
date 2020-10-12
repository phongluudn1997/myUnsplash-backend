import mongoose from "mongoose";
const { Schema } = mongoose;

const photoSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Photo = mongoose.model("Photo", photoSchema, "photos");
export default Photo;
