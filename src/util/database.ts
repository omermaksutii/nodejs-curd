const Sequelize= require('sequelize');
const path= require('path');
const dir=path.dirname(__filename);
console.log(dir)
// // setup a new database using database credentials set in .env
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
    storage: "src/db/database.sqlite"
  
  });

  export{sequelize}