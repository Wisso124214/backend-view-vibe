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

  app.put('/update-genre/:id', async (req, res) => {
    axios.put(`${SERVER_URL}/genre/${req.params.id}`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
    })
  
  app.delete('/delete-genre/:id', async (req, res) => {
    axios.delete(`${SERVER_URL}/genre/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(406).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
    })

//////////////////////////////////////////////

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

  app.put('/update-age/:id', async (req, res) => {
    axios.put(`${SERVER_URL}/age/${req.params.id}`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
    })
  
  app.delete('/delete-age/:id', async (req, res) => {
    axios.delete(`${SERVER_URL}/age/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(406).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
    })

//////////////////////////////////////////////  

  app.get('/get-actors', async (req, res) => {
    axios.get(`${SERVER_URL}/actors`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.post('/post-actor', async (req, res) => {

    axios.post(`${SERVER_URL}/actor`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
  });



app.put('/update-actor/:id', async (req, res) => {
  axios.put(`${SERVER_URL}/actor/${req.params.id}`, req.body)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(405).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    });
  })

app.delete('/delete-actor/:id', async (req, res) => {
  axios.delete(`${SERVER_URL}/actor/${req.params.id}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(406).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    });
  })

  ////////////////////////////////////////////////

  app.get('/get-movies', async (req, res) => {
    axios.get(`${SERVER_URL}/movies`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.post('/post-movie', async (req, res) => {

    axios.post(`${SERVER_URL}/movie`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
  });



app.put('/update-movie/:id', async (req, res) => {
  axios.put(`${SERVER_URL}/movie/${req.params.id}`, req.body)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(405).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    });
  })

app.delete('/delete-movie/:id', async (req, res) => {
  axios.delete(`${SERVER_URL}/movie/${req.params.id}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(406).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    });
  })

  ////////////////////////////////////////////////////
  
  app.get('/get-movies_actors', async (req, res) => {
    axios.get(`${SERVER_URL}/movies_actors`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.post('/post-movie_actor', async (req, res) => {

    axios.post(`${SERVER_URL}/movie_actor`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
  });



app.put('/update-movie_actor/:id', async (req, res) => {
  axios.put(`${SERVER_URL}/movie_actor/${req.params.id}`, req.body)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(405).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    });
  })

app.delete('/delete-movie_actor/:id', async (req, res) => {
  axios.delete(`${SERVER_URL}/movie_actor/${req.params.id}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(406).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    });
  })


}