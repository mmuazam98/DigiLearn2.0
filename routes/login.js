const Router = require("express").Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
// const session = require("session-session");
const session = require("express-session");
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "digi-learn",
// });
const con = mysql.createConnection({
  host: "db4free.net",
  user: "digilearn",
  password: "M.m@9084",
  database: "digilearn",
});
Router.use(session({ secret: "ZxCvBnM", saveUninitialized: true, resave: true }));

Router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  console.log(username, password);
  let name;
  if (username && password) {
    let storedPassword = "";
    let getPass = `SELECT * FROM users WHERE username = '${username}'`;
    con.query(getPass, async (err, results) => {
      if (err) throw err;
      if (results.length != 0) {
        storedPassword = results[0].password;
        console.log(storedPassword);
        name = results[0].name;
        username = results[0].username;
        designation = results[0].designation;
        contact = results[0].contact;
        class_ = results[0].class;
        regst = results[0].regst;
        uid = results[0].userID;
        try {
          if (await bcrypt.compare(password, storedPassword)) {
            console.log(name, designation, contact);
            req.session.name = name;
            req.session.contact = contact;
            req.session.designation = designation;
            req.session.username = username;
            req.session.class_ = class_;
            req.session.regst = regst;
            req.session.uid = uid;
            res.status(200).json({ message: "Login successful." });
          } else {
            // res.send("wrong password");
            // res.status(400); //("Not Allowed");
            res.status(401).json({ message: "Invalid password." });
          }
        } catch {
          res.status(500);
        }
      } else {
        // res.send("No user found");
        // res.status(401); //("not found");
        res.status(400).json({ message: "Invalid username." });
      }
    });
  }
});
Router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/");
  });
});
module.exports = Router;
