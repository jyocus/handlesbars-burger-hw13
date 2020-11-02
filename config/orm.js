var connection = require("../config/connection.js");

// Creating methods that will be necessary to execute the MYSQL commands in the controllers. These methods will help me retrieve and store data from the database.
function selectAll();
function insertOne();
function updateOne();

// Export the orm object for the model (burger.js).
module.exports = orm; 