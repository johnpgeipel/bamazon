DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INT(11) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(150),
department_name VARCHAR(50) NULL,
price DECIMAL(10,4) NOT NULL,
stock_quantity INT(11) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Boots", "Clothing", 120.99, 25);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Socks", "Clothing", 4.99, 13);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Cat Bed", "Pet Supplies", 15.99, 35);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 1750.00, 12);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("InstantPot", "Kitchen", 59.99, 25);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Kitty Litter", "Pet Supplies", 6.99, 30);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Toaster", "Kitchen", 35.00, 2);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Bike Helmet", "Sporting Goods", 150.00, 15);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Bike", "Sporting Goods", 850.00, 25);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Surfboard", "Sporting Goods", 1100.00, 17);