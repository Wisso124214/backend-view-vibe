import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  title: String,
});

export const Genre = mongoose.model("Genre", genreSchema);
