import axios from "axios";
import { SERVER_URL } from "./config.js";

import app from "./middleware.js";
import { dbConnection } from "./db.js";
import { createUserControllers } from "./controllers/userController.js";
import { createUserRoutes } from "./routes/userRoutes.js";
import { createMovieControllers } from "./controllers/movieController.js";
import { createMovieRoutes } from "./routes/movieRoutes.js";

dbConnection(app);

createUserControllers(app);
createUserRoutes(app);

createMovieControllers(app);
createMovieRoutes(app);

// axios.post(SERVER_URL+'/post-genre', {title: "+19"})
// .then((res) => {
//   console.log('posted');
// })
// .catch((err) => {
//   console.log('error posting', JSON.stringify(err, null, 2));
// })

axios.get(SERVER_URL+'/get-genres')
.then((res)=>{
  console.log(res.data)
})
.catch((err)=>{
  console.log(err)
})