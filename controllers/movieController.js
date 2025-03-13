import { Genre } from '../models/movieModels.js';

export const createMovieControllers = (app) => {
  app.get('/genres', async (req, res) => {
    try {
      const genres = await Genre.find();
      res.json(genres);
    } catch (error) {
      res.status(403).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

  app.post('/genre', async (req, res) => {
    try {
      const genre = new Genre(req.body);
      await genre.save();
      res.json(genre);
    } catch (error) {
      res.status(402).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

  app.put('/genre/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const genre = await Genre.findByIdAndUpdate(id, req.body, { new: true });
      res.json(genre);
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

  app.delete('/genre/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Genre.findByIdAndDelete(id);
      res.json({ message: 'Genre deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });
}