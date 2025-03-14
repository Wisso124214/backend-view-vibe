import axios from 'axios';
import { SERVER_URL } from '../config.js';

export const createMovieRoutes = (app) => {
  app.get('/get-genres', async (req, res) => {
    axios.get(`${SERVER_URL}/genres`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.post('/post-genre', async (req, res) => {

    axios.post(`${SERVER_URL}/genre`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.get('/get-ages', async (req, res) => {
    axios.get(`${SERVER_URL}/ages`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.post('/post-age', async (req, res) => {

    axios.post(`${SERVER_URL}/age`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
  });
}