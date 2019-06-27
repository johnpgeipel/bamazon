// dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");
var colors = require("colors");
var itmeID = 0;
var itemQuantity = 0;
var selected;
var statement;

var connection = mysql.createConnection({
    host: "localhost",
    port = 8000,

    user: "root",
    password: "",
    database: "bamazonDB"
});


