import axios from 'axios';
import { SERVER_URL, config } from '../config.js';

const { media_per_page } = config;

export const createMovieRoutes = async (app) => {
  app.get('/get-genres', async (req, res) => {
    axios
      .get(`${SERVER_URL}/genres`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.get('/get-genre/:id', async (req, res) => {
    axios
      .get(`${SERVER_URL}/genre/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.post('/post-genre', async (req, res) => {
    axios
      .post(`${SERVER_URL}/genre`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.put('/update-genre/:id', async (req, res) => {
    axios
      .put(`${SERVER_URL}/genre/${req.params.id}`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.delete('/delete-genre/:id', async (req, res) => {
    axios
      .delete(`${SERVER_URL}/genre/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(406).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  //////////////////////////////////////////////

  app.get('/get-ages', async (req, res) => {
    axios
      .get(`${SERVER_URL}/ages`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.get('/get-age/:id', async (req, res) => {
    axios
      .get(`${SERVER_URL}/age/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.post('/post-age', async (req, res) => {
    axios
      .post(`${SERVER_URL}/age`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.put('/update-age/:id', async (req, res) => {
    axios
      .put(`${SERVER_URL}/age/${req.params.id}`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.delete('/delete-age/:id', async (req, res) => {
    axios
      .delete(`${SERVER_URL}/age/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(406).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  //////////////////////////////////////////////

  app.get('/get-actors', async (req, res) => {
    axios
      .get(`${SERVER_URL}/actors`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.get('/get-actor/:id', async (req, res) => {
    axios
      .get(`${SERVER_URL}/actor/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.post('/post-actor', async (req, res) => {
    axios
      .post(`${SERVER_URL}/actor`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.put('/update-actor/:id', async (req, res) => {
    axios
      .put(`${SERVER_URL}/actor/${req.params.id}`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.delete('/delete-actor/:id', async (req, res) => {
    axios
      .delete(`${SERVER_URL}/actor/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(406).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  ////////////////////////////////////////////////

  app.get('/get-movies', async (req, res) => {
    axios
      .get(`${SERVER_URL}/movies`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.get('/get-movie/:id', async (req, res) => {
    axios
      .get(`${SERVER_URL}/movie/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.post('/post-movie', async (req, res) => {
    axios
      .post(`${SERVER_URL}/movie`, req.body)
      .then(async (response) => {
        await axios.get(SERVER_URL + '/delete-all-paginations');
        await axios.get(SERVER_URL + '/create-paginations');
        await axios.get(SERVER_URL + '/update-global');
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.put('/update-movie/:id', async (req, res) => {
    await axios
      .put(`${SERVER_URL}/movie/${req.params.id}`, req.body)
      .then(async (response) => {
        await axios.get(SERVER_URL + '/delete-all-paginations');
        await axios.get(SERVER_URL + '/create-paginations');
        await axios.get(SERVER_URL + '/update-global');
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.delete('/delete-movie/:id', async (req, res) => {
    axios
      .delete(`${SERVER_URL}/movie/${req.params.id}`)
      .then(async (response) => {
        await axios.get(SERVER_URL + '/delete-all-paginations');
        await axios.get(SERVER_URL + '/create-paginations');
        await axios.get(SERVER_URL + '/update-global');
        res.json(response.data);
      })
      .catch((error) => {
        res.status(406).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  ////////////////////////////////////////////////////

  app.get('/get-movies_actors', async (req, res) => {
    axios
      .get(`${SERVER_URL}/movies_actors`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.get('/get-actor/:id', async (req, res) => {
    axios
      .get(`${SERVER_URL}/actor/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.post('/post-movie_actor', async (req, res) => {
    axios
      .post(`${SERVER_URL}/movie_actor`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.put('/update-movie_actor/:id', async (req, res) => {
    axios
      .put(`${SERVER_URL}/movie_actor/${req.params.id}`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.delete('/delete-movie_actor/:id', async (req, res) => {
    axios
      .delete(`${SERVER_URL}/movie_actor/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(406).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });
  ////////////////////////////////////////////////////

  app.get('/get-comments', async (req, res) => {
    axios
      .get(`${SERVER_URL}/comments`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.get('/get-comment/:id', async (req, res) => {
    axios
      .get(`${SERVER_URL}/comment/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.post('/post-comment', async (req, res) => {
    axios
      .post(`${SERVER_URL}/comment`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.put('/update-comment/:id', async (req, res) => {
    axios
      .put(`${SERVER_URL}/comment/${req.params.id}`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.delete('/delete-comment/:id', async (req, res) => {
    axios
      .delete(`${SERVER_URL}/comment/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(406).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  //////////////////////////////////////////////

  app.get('/get-ratings', async (req, res) => {
    axios
      .get(`${SERVER_URL}/ratings`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.post('/post-rating', async (req, res) => {
    axios
      .post(`${SERVER_URL}/rating`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.put('/update-rating/:id', async (req, res) => {
    axios
      .put(`${SERVER_URL}/rating/${req.params.id}`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.delete('/delete-rating/:id', async (req, res) => {
    axios
      .delete(`${SERVER_URL}/rating/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(406).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  //////////////////////////////////////////////

  app.get('/create-paginations', async (req, res) => {
    const movies = await axios.get(SERVER_URL + '/get-movies');
    const pages = Math.ceil(movies.data.length / media_per_page);

    for (let i = 0; i < pages; i++) {
      const page = movies.data.slice(
        i * media_per_page,
        (i + 1) * media_per_page
      );
      await axios.post(SERVER_URL + '/post-pagination', {
        page: i,
        results: page.map((m) => m._id),
      });
    }
    const response = await axios.get(SERVER_URL + '/paginations');

    res.json(response.data);
  });

  app.get('/get-paginations', async (req, res) => {
    await axios
      .get(`${SERVER_URL}/paginations`)
      .then(async (response) => {
        if (response.data.length === 0) {
          await axios
            .get(`${SERVER_URL}/create-paginations/`)
            .then((response_pagination) => {
              response = response_pagination;
            })
            .catch((error) => {
              res.status(405).json(error);
              console.log(JSON.stringify(error, null, 2));
            });
        }

        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.get('/get-pagination/:id', async (req, res) => {
    axios
      .get(`${SERVER_URL}/pagination/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.get('/get-page/:page', async (req, resp) => {
    const { page } = req.params;

    const start = new Date();

    await axios
      .get(SERVER_URL + '/get-globals')
      .then(async (res) => {
        let data;
        let results = [];

        if (!res.data[0]) {
          await axios
            .get(SERVER_URL + '/update-global')
            .then((res) => {
              data = res.data;
            })
            .catch((err) => console.log(err));
        } else {
          data = res.data[0];
        }

        await axios
          .get(SERVER_URL + '/get-pagination/' + data.id_media_pages[page])
          .then(async (res) => {
            if (res.data) {
              for (let id of res.data.results) {
                await axios
                  .get(SERVER_URL + '/get-movie/' + id)
                  .then((res) => {
                    results.push(res.data);
                  })
                  .catch((err) => console.log(err));
              }

              resp.json({
                page: res.data.page,
                results,
                total_pages: data.total_media_pages,
                total_results: data.total_media_results,
                time: (new Date() - start) / 1000,
              });
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  app.post('/post-pagination', async (req, res) => {
    axios
      .post(`${SERVER_URL}/pagination`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.put('/update-pagination/:id', async (req, res) => {
    axios
      .put(`${SERVER_URL}/pagination/${req.params.id}`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.delete('/delete-pagination/:id', async (req, res) => {
    axios
      .delete(`${SERVER_URL}/pagination/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(406).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.get('/delete-all-paginations', async (req, res) => {
    await axios
      .get(SERVER_URL + '/get-paginations')
      .then((res) => {
        for (let page of res.data) {
          axios
            .delete(SERVER_URL + '/delete-pagination/' + page._id)
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
    res.json({ message: 'All paginations deleted' });
  });

  //////////////////////////////////////////////

  app.get('/get-globals', async (req, res) => {
    axios
      .get(`${SERVER_URL}/globals`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.post('/post-global', async (req, res) => {
    axios
      .post(`${SERVER_URL}/global`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.get('/update-global', async (req, res) => {
    let global = {};

    await axios
      .get(SERVER_URL + '/get-paginations')
      .then(async (res) => {
        const total_pages = res.data.length;
        let total_media = 0;
        let method = 'post';
        let url = SERVER_URL + '/post-global';
        let id_media_pages = [];

        for (let page of res.data) {
          total_media += page.results.length;
          id_media_pages.push(page._id);
        }

        await axios.get(SERVER_URL + '/get-globals').then(async (res) => {
          if (res.data[0]) {
            method = 'put';
            url = SERVER_URL + '/update-global/' + res.data[0]._id;
          }

          await axios[method](url, {
            total_media_pages: total_pages,
            total_media_results: total_media,
            last_media_update: new Date(),
            id_media_pages,
          })
            .then((res) => {
              global = res.data;
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));

    res.json(global);
  });

  app.put('/update-global/:id', async (req, res) => {
    axios
      .put(`${SERVER_URL}/global/${req.params.id}`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.delete('/delete-global/:id', async (req, res) => {
    axios
      .delete(`${SERVER_URL}/global/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(406).json(error);
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.get('/delete-all-globals', async (req, res) => {
    await axios
      .get(SERVER_URL + '/get-globals')
      .then((res) => {
        for (let global of res.data) {
          axios
            .delete(SERVER_URL + '/delete-global/' + global._id)
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
    res.json({ message: 'All globals deleted' });
  });

  app.get('/delete-globals-paginations', async (req, res) => {
    await axios
      .get(SERVER_URL + '/delete-all-paginations')
      .catch((err) => console.log(err));

    await axios
      .get(SERVER_URL + '/delete-all-globals')
      .catch((err) => console.log(err));
    res.json({ message: 'All globals paginations deleted' });
  });
};
