const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "sarita",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// inserting new data
// let q = "INSERT INTO user(id, username, email, password) VALUES ?";
// let data = [];
// for (let i = 1; i <= 100; i++) {
//   data.push(getRandomUser());
// }

app.get("/", (req, res) => {
  let q = `SELECT count(*) from user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.render("some error in DB");
  }
});

app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("showusers.ejs", { users });
    });
  } catch (err) {
    console.log(err);
    res.render("some error in DB");
  }
});

// Edit Rout
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  res.render("edit.ejs");
});

app.listen("8080", () => {
  console.log("server is listening to port 8080");
});

// connection.end();
