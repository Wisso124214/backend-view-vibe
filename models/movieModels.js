import { Int32 } from 'mongodb';
import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
  title: String,
});

const ageSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const actorSchema = new mongoose.Schema({
  name: String,
  original_name: String,
  image: String,
  job: String,
  department: String,
  character: String,
});

const movieSchema = new mongoose.Schema({
  id_age: String,
  id_genres: Array,
  title: String,
  original_title: String,
  overview: String,
  release_date: Date,
  backdrop_image: String,
  cover_image: String, //poster_path
  id_api: Int32, // movie id from api
  runtime: Int32,
  cast: Array,
  rating_users: Number,
  rating_critics: Number,
  rating_count: Int32,
  homepage: String,
  id_comments: Array,
});

const movie_actorSchema = new mongoose.Schema({
  id_actor: Int32,
  id_movie: Int32,
});

const commentSchema = new mongoose.Schema({
  id_user: Int32,
  username: String,   // this must be in the user model
  content: String,
  publish_date: Date,
  id_comments_replies: Array,
  users_liked: Array,
  id_api: String,    // comment id from api
});

const ratingSchema = new mongoose.Schema({
  id_user: Int32,
  id_movie: Int32,
  rating: Number,
  publish_date: Date,
});

const paginationSchema = new mongoose.Schema({
  page: Int32,
  results: Array,
});

const globalSchema = new mongoose.Schema({
  total_media_pages: Int32,
  total_media_results: Int32,
  last_media_update: Date,
  id_media_pages: Array,
});

export const Genre = mongoose.model('Genre', genreSchema);
export const Age = mongoose.model('Age', ageSchema);
export const Actor = mongoose.model('Actor', actorSchema);
export const Movie = mongoose.model('Movie', movieSchema);
export const Movie_Actor = mongoose.model('Movie_Actor', movie_actorSchema);
export const Comment = mongoose.model('Comment', commentSchema);
export const Rating = mongoose.model('Rating', ratingSchema);
export const Pagination = mongoose.model('Pagination', paginationSchema);
export const Global = mongoose.model('Global', globalSchema);
