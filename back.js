import axios from 'axios';
import { SERVER_URL } from './config.js';

import app from './middleware.js';
import { dbConnection } from './db.js';
import { createUserControllers } from './controllers/userController.js';
import { createUserRoutes } from './routes/userRoutes.js';
import { createMovieControllers } from './controllers/movieController.js';
import { createMovieRoutes } from './routes/movieRoutes.js';

import { encryptData } from './logicFuntions/main.js';

// getIdDevice().then((id) => {
//   console.log(id);
// });

// console.log(encryptData("data"))

dbConnection(app)
  .then(async () => {
    await createUserControllers(app);
    await createUserRoutes(app);

    await createMovieControllers(app);
    await createMovieRoutes(app);

    const url = 'https://api.themoviedb.org/3/discover/movie?language=en-US';
    const url_cast = 'https://api.themoviedb.org/3/movie/:movie_id/credits';
    const url_image = 'https://image.tmdb.org/t/p/w500';
    const detailsMovie = 'https://api.themoviedb.org/3/movie';

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTE3ZDc0ZTdkOTZjNWI5ZTJkYWRiMGYxMzU2NmI5YSIsIm5iZiI6MTc0MTM5MTQxMS4zMDMsInN1YiI6IjY3Y2I4NjMzYTRkZjk3ZGI5NjRmNjg3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eGIHpPLr1waotJ5nHWUTMIqqt4fKA3JGGkc9lq75wLs',
      },
    };

    const deleteGenres = async () => {
      axios
        .get(SERVER_URL + '/get-genres')
        .then((res) => {
          let arr = [];
          for (let d in res.data) {
            arr.push(res.data[d].title);
            axios
              .delete(SERVER_URL + '/delete-genre/' + res.data[d]._id)
              .then((res) => console.log('deleted', res.data))
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    };

    const getGenres = async () => {
      axios
        .get(SERVER_URL + '/get-genres')
        .then((res) => {
          let arr = [];
          for (let d in res.data) {
            arr.push(res.data[d].title);
          }

          arr.sort();
          // console.log('genres', arr);
        })
        .catch((err) => console.log(err));
    };

    // getGenres();
    // deleteGenres();

    const processingGenres = new Set(); // Conjunto para rastrear géneros en proceso

    const addGenres = async (thisGenre) => {
      if (processingGenres.has(thisGenre)) {
        return;
      }

      processingGenres.add(thisGenre); // Añadir género al conjunto de procesamiento

      await axios
        .get(SERVER_URL + '/get-genres')
        .then(async (dbgenres) => {
          let found = false;

          for (let d in dbgenres.data) {
            if (dbgenres.data[d].title === thisGenre) {
              found = true;
              break;
            }
          }

          if (!found) {
            await axios.post(SERVER_URL + '/post-genre', { title: thisGenre });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          processingGenres.delete(thisGenre); // Eliminar género del conjunto de procesamiento
        });
    };

    const createAges = async () => {
      const ages = [
        { title: 'All', description: 'All ages' },
        { title: '+12', description: 'Contains violence and blood' },
        {
          title: '+16',
          description: 'Contains violence, strong language, and sexual content',
        },
        {
          title: '+18',
          description:
            'Contains violence, strong language, sexual content, and drug use',
        },
      ];

      for (let a of ages) {
        await axios
          .post(SERVER_URL + '/post-age', a)
          .catch((err) => {
            console.log('error posting age', JSON.stringify(err, null, 2));
          });
      }
    };

    const getIdCast = async (person) => {
      if (processingGenres.has(person)) {
        return;
      }

      processingGenres.add(person);
      let id_found = -1;

      await axios
        .get(SERVER_URL + '/get-actors')
        .then(async (res) => {
          for (let d in res.data) {
            if (res.data[d].name === person.name) {
              id_found = res.data[d]._id;
              break;
            }
          }

          if (id_found === -1) {
            await axios
              .post(SERVER_URL + '/post-actor', person)
              .then((res) => {
                id_found = res.data._id;
              })
              .catch((err) => {
                console.log('Error posting actor: ', err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          processingGenres.delete(person); // Eliminar género del conjunto de procesamiento
        });

      return id_found;
    };

    const getMovies = async () => {
      axios
        .get(SERVER_URL + '/get-movies')
        .then((res) => {
          for (let movie of res.data) {
            console.log(movie.title);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getArrTitleMovies = async () => {
      let arr = [];
      await axios
        .get(SERVER_URL + '/get-movies')
        .then((res) => {
          for (let movie of res.data) {
            arr.push(movie.title);
          }

          arr.sort();
        })
        .catch((err) => {
          console.log(err);
        });

      return arr;
    };

    const getIdCastParallel = async (people) => {
      const existingActors = await axios.get(SERVER_URL + '/get-actors');
      const existingNames = new Set(
        existingActors.data.map((actor) => actor.name)
      );

      const requests = people.map(async (person) => {
        if (existingNames.has(person.name)) {
          return existingActors.data.find((actor) => actor.name === person.name)
            ._id;
        } else {
          const response = await axios.post(SERVER_URL + '/post-actor', person);
          return response.data._id;
        }
      });

      return Promise.all(requests);
    };

    const addMovies = async (url, max_pages) => {
      for (let i = 1; i <= max_pages; i++) {
        try {
          const response = await fetch(`${url}&page=${i}`, options);
          const data = await response.json();

          for (let movie of data.results) {
            const titles = await getArrTitleMovies();

            if (!titles.includes(movie.title)) {
              const movieDetails = await fetch(
                `${detailsMovie}/${movie.id}?language=en-US&page=${i}`,
                options
              ).then((res) => res.json());

              const genres = movieDetails.genres.map((g) => g.name);
              const age =
                genres.includes('Horror' || 'Crime') || movieDetails.adult
                  ? '+18'
                  : genres.includes('War' || 'Drama' || 'Romance')
                  ? '+16'
                  : genres.includes('Action' || 'Thriller')
                  ? '+12'
                  : 'All';

              const id_age = (
                await axios.get(SERVER_URL + '/get-ages')
              ).data.find((a) => a.title === age)._id;
              const id_genres = (
                await axios.get(SERVER_URL + '/get-genres')
              ).data
                .filter((g) => genres.includes(g.title))
                .map((g) => g._id);

              const castAndCrewResponse = await axios.get(
                url_cast.replace(':movie_id', movie.id),
                options
              );
              const people = [
                ...castAndCrewResponse.data.cast,
                ...castAndCrewResponse.data.crew,
              ].map((person) => ({
                name: person.name,
                original_name: person.original_name,
                image: url_image + person.profile_path,
                job: person.job,
                department: person.department,
                character: person.character,
              }));

              const castnCrew = await getIdCastParallel(people);

              const movieData = {
                id_age,
                genres: id_genres,
                title: movie.title,
                original_title: movie.original_title,
                overview: movie.overview,
                release_date: movie.release_date,
                backdrop_image: url_image + movie.backdrop_path,
                cover_image: url_image + movie.poster_path,
                duration: movie.runtime || 60 + Math.floor(Math.random() * 80),
                id_api: movie.id,
                cast: castnCrew,
                rating_users:
                  Math.round((movie.vote_average + Math.random() - 0.4) * 10) /
                  10,
                rating_critics:
                  Math.round((movie.vote_average + Math.random() - 0.4) * 10) /
                  10,
                rating_count: movie.vote_count,
                homepage: movie.homepage,
              };

              await axios
                .post(SERVER_URL + '/post-movie', movieData)
                .then((res) => console.log('posted movie', res.data.title))
                .catch((err) =>
                  console.log(
                    'error posting movie',
                    JSON.stringify(err, null, 2)
                  )
                );
            }
          }
        } catch (err) {
          console.error('Error processing movies:', err);
        }
      }
    };

    const deleteMovies = async () => {
      await axios
        .get(SERVER_URL + '/get-movies')
        .then((res) => {
          for (let movie of res.data) {
            axios
              .delete(SERVER_URL + '/delete-movie/' + movie._id)
              .then((res) => console.log('deleted', res.data))
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    };

    const printPaginations = async () => {
      await axios
        .get(SERVER_URL + '/get-paginations')
        .then((res) => {
          for (let page of res.data) {
            console.log(page);
          }
        })
        .catch((err) => console.log(err));
    };

    // await printPaginations();

    await axios
      .get(SERVER_URL + '/delete-globals-paginations')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios.get(SERVER_URL + '/update-global').then((res) => {
      console.log(res.data);
    });

    // const page = 1;

    // await axios.get(SERVER_URL + '/get-page/' + page).catch((err) => {
    //   console.log(err);
    // });

    // UPDATE MOVIES WITH REVIEWS

    // await axios
    //   .get(SERVER_URL + '/get-movies')
    //   .then(async (res) => {
    //     for (let movie of res.data) {
    //       let id_reviews = [];

    //       await axios.get(`https://api.themoviedb.org/3/movie/${movie.id_api}/reviews`, options)
    //       .then(async (res) => {
    //         let reviews = res.data.results;

    //         for (let review of reviews) {
    //           let reviewData = {
    //             id_api: review.id,
    //             username: review.author,
    //             content: review.content,
    //             publish_date: review.created_at,
    //             users_liked: [],
    //             id_comments_replies: [],
    //           }

    //           await axios.post(SERVER_URL + '/post-comment', reviewData)
    //           .then((res) => {
    //             console.log('posted review');
    //             id_reviews.push(res.data._id);
    //           })
    //           .catch((err) => {
    //             console.log('error posting review', err);
    //           });
    //         }
    //       })
    //       .catch((err) => {
    //         console.log('error getting reviews', err);
    //       });

    //       await axios.put(SERVER_URL + '/update-movie/' + movie._id, {
    //         id_comments: id_reviews,
    //       })
    //       .then((res) => {
    //         console.log('updated', res.data.title, res.data.id_comments);
    //       })
    //       .catch((err) => {
    //         console.log('error updating movie' + movie.title, err);
    //       });
    //     }

    //     console.log('finished')
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // COMMENTS DELETED

    // await axios
    //   .get(SERVER_URL + '/get-comments')
    //   .then(async (res) => {
    //     for (let comment of res.data) {
    //       await axios.delete(SERVER_URL + '/delete-comment/' + comment._id)
    //         .then((res) => {
    //           console.log('deleted', comment._id);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     }

    //     console.log('finished deleting comments');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // await axios
    //   .get(SERVER_URL + '/update-global')
    //   .then((res) => {
    //     console.log('global', res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // UPDATE PAGINATIONS

    // await axios.get(SERVER_URL + '/delete-all-paginations');
    // await axios.get(SERVER_URL + '/create-paginations');
    // await axios.get(SERVER_URL + '/update-global');

    // await axios.get(SERVER_URL + '/get-paginations').then((res) => {
    //   for (let page of res.data) {
    //     if (page.page === 0) {
    //       console.log(page);
    //     }
    //   }
    // });

    // const title_movies = await getArrTitleMovies();
    // console.log(title_movies, title_movies.length);

    // await addMovies(url, 100);
    // deleteMovies();

    // axios.get(SERVER_URL+'/get-genres')
    // .then((res)=>{
    //   console.log(res.data)
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })

    // axios.get(SERVER_URL+'/get-actors')
    // .then((res)=>{
    //   let name = "Mark Ruffalo";
    //   let found = false;
    //   for (let d of res.data){
    //     if (d.name === name){
    //       found = true;
    //     }
    // }
    // if (found === false){
    //   axios.post(SERVER_URL+'/post-actor', {name: "Mark Ruffalo", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjB4lE2en8edlY0WeVQm70ccncCZyP6IXLrg&s"})
    // }
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
  })
  .catch((err) => {
    console.log('Error connecting to db ', err);
  });

process.on('uncaughtException', function (err) {
  console.log(err);
});
