import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  title: String,
});

const ageSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const actorSchema = new mongoose.Schema({
  name: String,
  image: String,
});

export const Genre = mongoose.model("Genre", genreSchema);
export const Age = mongoose.model("Age", ageSchema);
export const Actor = mongoose.model("Actor", actorSchema);
