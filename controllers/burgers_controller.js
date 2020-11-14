var express = require("express");

var router = express.Router();

// Importing the model
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
//Grab all burgers in our db
router.get("/", function(req, res) {
    burger.all(function(data) {
      var burgerObject = {
        burgers: data
      };
      console.log(burgerObject);
      res.render("index", burgerObject);
    });
  });
  //route for new burgers the user has created
  router.post("/api/burgers", function(req, res) {
    burger.create([
      "name", "devoured"
    ], [
      req.body.name, false
    ], function(data) {
      res.send("Worked!!!");
    });
  });
  
  //Route will grab data for "devoured true/false"
  router.put("/api/devoured/:burgerId", function(req, res) {
  //console.log("devoured route")
    burger.update({
      devoured: true
    }, "id =" + req.params.putID, function (data){
    });
  });
  

module.exports = router