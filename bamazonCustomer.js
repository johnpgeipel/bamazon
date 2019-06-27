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

// connection to the mysql server and database
connection.connect(function(err) {
    if (err) throw err;
    start();
});

//starts the app and initiates conversation with customer
function start() {
    console.log("\nWELCOME TO THE BAMAZON STORE!\n".blue);
    inquirer.prompt(
        {
            name: "browse",
            type: "confirm",
            message: "Would you like to browse the available products?"
        }

    ).then(function(answer) {
        if (answer.browse) {
            showItems();
            setTimeout(promptUser, 1000);
        } else {
            exit();
        }
    });
}



