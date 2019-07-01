// dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");
var colors = require("colors");
var itemID = 0;
var itemQuantity = 0;
var selected;
var statement;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "password",
    database: "bamazonDB"
});

// connection to the mysql server and database
connection.connect(function(err) {
    if (err) throw err;
    start();
});

//starts the app and initiates conversation with customer
function start() {
    console.log("\nWELCOME TO THE BAMAZON STORE!\n".cyan);
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

// function calls and displays products to users

function showItems() {
    connection.query("SELECT  * FROM products",
    function(err,res) {
        if (err) throw err;
        console.log("\nAll Products\n".cyan.underline);
        // console.log(res);
        var products = [];
        for (var i = 0; i < res.length; i++) {
            products.push([res[i].item_id, res[i].product_name, res[i].department_name,
                res[i].price, res[i].stock_quantity]);
        }
        var headings = ["Item ID", "Product", "Department", "Price ($)", "Quantity in Stock"];
        console.table(headings, products);
    });
}



function promptUser() {
    inquirer.prompt([
        {
			name: "id",
			type: "input",
			message: "Please enter the ID number of the item you'd like to purchase.",
			validate: function(value) {
				if (value <= 0 || isNaN(value)) {
					console.log("\nPlease enter a valid item ID.\n".red);
				} else {
					return true;
				}
			}
		},
        {
            name: "quantity",
            type: "input",
            message: "Please enter the quantity of the item that you would like to purchase.",
            validate: function(value) {
                if (isNaN(value)) {
                    console.log("\nPlease enter a valid number.\n.red");
                } else {
                    return true;
                }
            }
        }
    ]).then(function(answer) {
        itemID = answer.id;
        itemQuantity = answer.quantity;

        connection.query("SELECT * FROM products WHERE  item_id=" + itemID, function(err,res) {
            selected = res[0];

            

            if(itemQuantity > selected.stock_quantity && selected.stock_quantity > 1) {
                statement = "\nWe're sorry, we only have " + selected.stock_quantity + " " + selected.product_name + "s available at this time.\n";
                console.log(statement.red);
                promptUser();

            } else if (itemQuantity > selected.stock_quantity && selected.stock_quantity === 1) {
                statement = "\nWe're sorry, we only have 1 " + selected.product_name + " available at this time.\n";
                console.log(statement.red);
                promptUser();

            }else if (itemQuantity > selected.stock_quantity && selected.stock_quantity < 1) {
                statement : "\nWe're sorry, " + selected.product_name + " is currently out of stock.\n";
                console.log(statement.red);
                promptUser();

            } else if (+itemQuantity === 1) {
                statement = "\nYou are purchasing 1 " + selected.product_name + ".";
                buyProduct();

            } else {
                statement = "\nYou are purchasing " +
                itemQuantity + " " + selected.product_name + "s.";
                buyProduct();
            }
        });
    });
}

function buyProduct() {
    inquirer.prompt(
        {
            name: "buy",
            type : "confirm",
            message: statement + " Would like to check out?"
        }
    ).then(function(answer) {
        if(answer.buy) {
            connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [itemQuantity, itemID], function(err, res) {
                if (err) throw err;
                var totalStatement = "\nYour total is $" +
                (itemQuantity * selected.price) + "\n";
                console.log(totalStatement.cyan);
                setTimeout(buyDifferent, 1000);
            });
        } else {
            buyDifferent();
        }
    });
}

function buyDifferent() {
    inquirer.prompt(
        {
            name: "differentItem",
            type: "confirm",
            message: "Would you like to purchase a different item?"
        }
    ).then(function(answer) {
        if (answer.differentItem) {
            showItems();
            setTimeout(promptUser, 1000);
        } else {
            exit();
        }
    });
}

function exit() {
    console.log("\nThanks for visiting Bamazon! Have a great day!\n".cyan);
    connection.end();
}

