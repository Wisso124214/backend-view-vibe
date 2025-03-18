import axios from 'axios';
import { SERVER_URL } from '../config.js';

export const createUserRoutes = (app) => {

  app.get('/get-contacts', async (req, res) => {
    axios.get(`${SERVER_URL}/contacts`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.post('/post-contact', async (req, res) => {
    axios.post(`${SERVER_URL}/contact`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.put('/update-contact/:id', async (req, res) => {
    axios.put(`${SERVER_URL}/contact/${req.params.id}`, req.body)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(405).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
    })
  
  app.delete('/delete-contact/:id', async (req, res) => {
    axios.delete(`${SERVER_URL}/contact/${req.params.id}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(406).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
    })
/////////////////////////////////////////////////

app.get('/get-sessions', async (req, res) => {
  axios.get(`${SERVER_URL}/sessions`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    });
});

app.post('/post-session', async (req, res) => {
  axios.post(`${SERVER_URL}/session`, req.body)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(402).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    });
});

app.put('/update-session/:id', async (req, res) => {
  axios.put(`${SERVER_URL}/session/${req.params.id}`, req.body)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(405).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    });
  })

app.delete('/delete-session/:id', async (req, res) => {
  axios.delete(`${SERVER_URL}/session/${req.params.id}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(406).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    });
  })

////////////////////////////////////////////////////////////////

app.get('/get-users', async (req, res) => {
  axios.get(`${SERVER_URL}/users`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    });
});

app.post('/post-user', async (req, res) => {
  axios.post(`${SERVER_URL}/user`, req.body)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(402).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    });
});

app.put('/update-user/:id', async (req, res) => {
  axios.put(`${SERVER_URL}/user/${req.params.id}`, req.body)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(405).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    });
  })

app.delete('/delete-user/:id', async (req, res) => {
  axios.delete(`${SERVER_URL}/user/${req.params.id}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(406).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    });
  })

  // app.get('/test-db', async (req, resp) => {
  //   //Evaluar permisos asd
  //   axios.post(`${SERVER_URL}/session`,
  //     {
  //       date: new Date(),
  //     }
  //   )
  //   .then((res) => {
  //     console.log('posted');
  //     //console.log('posted', res.data, 'id: ', res.data._id);
  //   })
  //   .catch((err) => {
  //     console.log('error posting', JSON.stringify(err, null, 2));
  //     resp.status(500).json({ message: err.message });
  //   })
  // });
}
