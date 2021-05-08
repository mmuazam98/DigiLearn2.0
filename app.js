const express = require("express");
const app = express();
const util = require("util");
const bodyparser = require("body-parser");
const session = require("express-session");
const mysql = require("mysql");
const sessionChecker = require("./middleware/sessionChecker");
const login = require("./routes/login");

app.use(session({ secret: "ZxCvBnM", saveUninitialized: true, resave: true }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", login);
// console.log(shortid.generate());
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "digi-learn",
//   multipleStatements: true,
// });
const con = mysql.createConnection({
  host: "db4free.net",
  user: "digilearn",
  password: "M.m@9084",
  database: "digilearn",
  multipleStatements: true,
});
app.get("/", (req, res) => {
  if (req.session.name) res.redirect("/home");
  else res.render("login", { page: "login" });
});
app.get("/home", sessionChecker, async (req, res, next) => {
  let { name, username, contact, designation, class_, uid } = req.session;
  if (designation == "student") {
    let query = `SELECT * FROM classes WHERE class='${class_}' ORDER BY subjectID`;
    con.query(query, (err, results) => {
      console.log(results);
      let obj = [];
      results.forEach((e) => {
        obj.push({
          subject: e.name,
          link: e.meet,
          teacher: e.teacher,
          img: e.image,
          total: e.total,
        });
      });
      let attendance = `SELECT * FROM attendance WHERE userID='${uid}'`;
      con.query(attendance, (error, result) => {
        console.log(result);

        obj.forEach((o) => {
          let x = o.subject;
          o["att"] = result[0][x.toLowerCase()];
        });
        console.log(obj);

        res.render("index", {
          page: "index",
          name: name,
          username: username,
          contact: contact,
          designation: designation,
          class: class_,
          classes: obj,
          regst: regst,
          att: result,
        });
      });
    });
  } else {
    let query = `SELECT * FROM classes WHERE userID='${uid}'`;
    con.query(query, (err, results) => {
      let obj = [];
      results.forEach((e) => {
        obj.push({
          subject: e.name,
          id: e.subjectID,
          link: e.meet,
          teacher: e.teacher,
          img: e.image,
          total: e.total,
        });
      });
      res.render("index", {
        page: "index",
        name: name,
        username: username,
        contact: contact,
        designation: designation,
        class: class_,
        classes: obj,
        regst: regst,
      });
    });
  }
});
app.get("/assignments", sessionChecker, async (req, res, next) => {
  let { name, username, contact, designation, class_ } = req.session;
  let query = `SELECT * FROM classes WHERE class='${class_}'`;
  con.query(query, (err, results) => {
    // console.log(results);
    let classes = [],
      num = ["one", "two", "three", "four", "five", "six"],
      pgrs = ["pgrs1", "pgrs2", "pgrs3", "pgrs4", "pgrs5", "pgrs6"];
    results.forEach((e, index) => {
      classes.push({
        name: e.name,
        id: num[index],
        pgrs: pgrs[index],
      });
    });
    console.log(classes);
    res.render("assignments", {
      page: "assignments",
      name: name,
      username: username,
      contact: contact,
      designation: designation,
      class_: class_,
      classes: classes,
      regst: regst,
    });
  });
});
app.get("/events", sessionChecker, async (req, res, next) => {
  let { name, username, contact, designation, class_ } = req.session;
  res.render("events", {
    page: "events",
    name: name,
    username: username,
    contact: contact,
    designation: designation,
    class: class_,
    regst: regst,
  });
});
app.get("/profile", sessionChecker, async (req, res, next) => {
  let { name, username, contact, designation, class_ } = req.session;
  res.render("profile", {
    page: "profile",
    name: name,
    username: username,
    contact: contact,
    designation: designation,
    class: class_,
    regst: regst,
  });
});
app.get("/attendance", sessionChecker, async (req, res, next) => {
  let { name, username, contact, designation, class_, uid } = req.session;
  let getClasses = `SELECT * FROM classes WHERE userID='${uid}'`;
  con.query(getClasses, (err, results) => {
    console.log(results);
    res.render("attendance", {
      page: "attendance",
      name: name,
      username: username,
      contact: contact,
      designation: designation,
      class: class_,
      classes: results,
    });
  });
});

app.get("/attendance/:class", async (req, res) => {
  let { name, username, contact, designation, class_ } = req.session;
  let cls = req.params.class[0];
  let query = `SELECT * FROM users WHERE class='${cls[cls.length - 1]}'`;
  con.query(query, (err, results) => {
    res.render("students", {
      page: "students",
      name: name,
      username: username,
      contact: contact,
      designation: designation,
      class: class_,
      students: results,
    });
  });
});
app.post("/mark", sessionChecker, async (req, res) => {
  let body = req.body;
  console.log(body);
  let cls = body.subjectID;
  let query = `UPDATE classes SET total = total + ${1} WHERE subjectID='${cls}'`;
  con.query(query, (err, results) => {
    console.log("Updated");
  });
  let getClassName = `SELECT * FROM classes WHERE subjectID='${cls}'`;
  con.query(getClassName, (err, results) => {
    let sub = results[0].name.toLowerCase();
    body.attendance.forEach((e, index) => {
      let update = `UPDATE attendance SET ${sub} = ${sub}+${e.att} WHERE userID='${e.uid}'`;
      console.log(update);
      con.query(update, (err, results) => {
        console.log(results);
        if (index + 1 == body.attendance.length) {
          console.log("Updated attendance");
          res.end();
        }
      });
    });
  });
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, function () {
  console.log(`Server has started successfully at https://localhost:${port}`);
});
