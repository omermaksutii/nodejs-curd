/**
 *
 * Assignment:
 *   The code below is a simple CRUD api to manipulate users.
 * The code works but does not follow api best practices and coding standards.  Please refactor
 * the code and api to make the code as clean as possible.  You are free to change any aspect of
 * the code, endpoints, folder structure, or anything else.
 *
 * Your goal is to write the best api you are capable of writing.  Everything about the final project should
 * be what you would consider a production quality api.
 */
var express = require("express");
var app = express();
//import thr router
import { router} from './route/user.route';
import { sequelize} from './util/database';
// Using `public` for static files: http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
// Use bodyParser to parse application/x-www-form-urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// add route
app.use(router)

// setup a new database using database credentials set in .env

// authenticate with the database
sequelize
  .authenticate()
  .then(function (err:any) {
    console.log("Connection established.");
  })
  .catch(function (err:any) {
    console.log("Unable to connect to database: ", err);
  });
// Listen on port 8080
var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
