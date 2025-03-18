import { Int32 } from "mongodb";
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

const movieSchema = new mongoose.Schema({
  id_age: String,
  genres: Array,
  title: String,
  synopsis: String,
  publish_date: Date,
  cover_image: String,
});

const movie_actorSchema = new mongoose.Schema({
  id_actor: Int32,
  id_movie: Int32,
});



export const Genre = mongoose.model("Genre", genreSchema);
export const Age = mongoose.model("Age", ageSchema);
export const Actor = mongoose.model("Actor", actorSchema);
export const Movie = mongoose.model("Movie", movieSchema);
export const Movie_Actor = mongoose.model("Movie_Actor", movieSchema);

