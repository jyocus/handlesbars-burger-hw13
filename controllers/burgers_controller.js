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
  router.post("/api/cats", function(req, res) {
    burger.create([
      "burger_name", "devoured"
    ], [
      req.body.name, false
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });
  
  //Route will grab data for "devoured true/false"
  router.put("/api/devoured/:burgerId", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.update({
      devoured: req.body.devoured
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  

module.exports = router