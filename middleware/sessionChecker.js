const express = require("express");
const Router = express.Router();
const session = require("express-session");
const MemoryStore = require("memorystore");

let sessionChecker = (req, res, next) => {
  console.log(`Session Checker: ${req.session.userID}`);
  console.log(req.session);
  if (req.session.name) {
    console.log(`Found User Session`);
    next();
  } else {
    console.log(`No User Session Found`);
    res.redirect("/");
  }
};
module.exports = sessionChecker;
