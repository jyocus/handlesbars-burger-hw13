var express = require("express");

var router = express.Router();

// Importing the model
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
//Grab all burgers in our db
router.get("/", function(req, res) {
  console.log("get route hit");
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
    console.log("post route hit");
  
    burger.create([
      "name", "devoured"
    ], [
      req.body.name, req.body.devoured
    ], function(result) {
      res.json({ id: result.insertID});
    });
  });
  
  //Route will grab data for "devoured true/false"
  router.put("/api/burgers/:burgerID", function(req, res) {
  console.log("devoured route hit");
  console.log(req.params.burgerID);
  console.log(req.body.devour);
  var condition = "id = " + req.params.burgerID;
    burger.update({
      devoured: req.body.devour
    }, condition, function (result){
      if (result.changedRows ==0) {
      return res.status(404).end();
    } else {
      res.status(200)
    }
    });
  });
  

module.exports = router;