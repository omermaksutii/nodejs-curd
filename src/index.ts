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
var Sequelize = require("sequelize");
var app = express();
var bodyParser = require("body-parser");

// Using `public` for static files: http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// Use bodyParser to parse application/x-www-form-urlencoded form data
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// setup a new database using database credentials set in .env
var sequelize = new Sequelize("database", "", "", {
  host: "0.0.0.0",
  dialect: "sqlite",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  // Data is stored in the file `database.sqlite` in the folder `db`.
  // Note that if you leave your app public, this database file will be copied if
  // someone forks your app. So don't use it to store sensitive information.
  storage: "/sandbox/src/db/database.sqlite"
});

// authenticate with the database
sequelize
  .authenticate()
  .then(function (err) {
    console.log("Connection established.");
  })
  .catch(function (err) {
    console.log("Unable to connect to database: ", err);
  });

interface IUser {
  firstName: string;
  lastName: string;
}

const User = sequelize.define("users", {
  firstName: {
    type: (Sequelize as any)["STRING"]
  },
  lastName: {
    type: (Sequelize as any)["STRING"]
  }
});

app.get("/", function (request, response) {
  response.sendFile("/sandbox/public/index.html");
});

app.get("/initdata", async (req, res) => {
  await User.sync({ force: true }); // Force drop table if already exists

  const usersWrite = [
    ["John", "Hancock"],
    ["Liz", "Smith"],
    ["Ahmed", "Khan"]
  ];

  await User.bulkCreate(
    usersWrite.map(([firstName, lastName]) => ({ firstName, lastName }))
  );

  res.send("Completed Data Initialization");
});

app.get("/users", async (req, res) => {
  await User.sync();
  const users = ((await User.findAll()) as any) as IUser[];
  res.jsonp(users);
});

app.get("/deleteuser/:first/:last", async (req, res) => {
  const first = req.params.first;
  const last = req.params.last;
  await User.sync();
  await User.destroy({
    where: {
      firstName: first,
      lastName: last
    }
  });
  res.send(`Deleted user ${first} ${last}`);
});

app.get("/adduser/:first/:last", async (req, res) => {
  const first = req.params.first;
  const last = req.params.last;
  await User.sync();

  const existingUser = await User.findAll({
    where: {
      firstName: first,
      lastName: last
    }
  });
  if (existingUser && existingUser.length > 0) {
    res.send("User already exists");
  } else {
    await User.create({
      firstName: first,
      lastName: last
    });
    res.send(`Created user ${first} ${last}`);
  }
});

app.get(
  "/updateuser/:first/:last/:modifyFirst/:modifyLast",
  async (req, res) => {
    const first = req.params.first;
    const last = req.params.last;
    const modifyFirst = req.params.modifyFirst;
    const modifyLast = req.params.modifyLast;

    await User.sync();
    const existingUsers = await User.findAll({
      where: {
        firstName: first,
        lastName: last
      }
    });
    if (!existingUsers || existingUsers.length === 0) {
      res.send("User doesn't exisft");
    } else {
      const u = existingUsers[0];
      u.firstName = modifyFirst;
      u.lastName = modifyLast;
      u.save();
    }
  }
);

// Listen on port 8080
var listener = app.listen(8088, function () {
  console.log("Listening on port " + listener.address().port);
});
