create database main;
use main;
show tables;


/* creating tables*/

# creating products_list table
CREATE TABLE products_list (
  id int(11) NOT NULL,
  header varchar(100) NOT NULL,
  type varchar(100) NOT NULL,
  value varchar(100) NOT NULL,
  active boolean not null,
  PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8;

# creating products table
CREATE TABLE products(
  id varchar (20) NOT NULL,
  list_id int(20) NOT NULL,
  list_type varchar(100) NOT NULL,
  price int(20) not null,
  more_info varchar(100),
  desp varchar(300),
  href varchar(100) not null,
  img varchar(100) not null,
  title varchar(100),
  active boolean not null,
  PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8;

# creating users table
create TABLE users(
  id int (20) NOT NULL AUTO_INCREMENT,
  email varchar(100) NOT NULL,
  type varchar(100) NOT NULL,
  password int(100) not null,
  fullName varchar(100) not null,
  phone varchar(100) not null,
  location varchar(400) not null,
  PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8;

# creating cart table
create TABLE cart(
  id int (20) NOT NULL AUTO_INCREMENT,
  email varchar(100) NOT NULL,
  fullName varchar(100) NOT NULL,
  status varchar(100) NOT NULL,
  phone varchar(100) not null,
  location varchar(400) not null,
  otherInfo varchar(400),
  orderDate DATE,
  statusDate Date,
  PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8;

CREATE TRIGGER cart_insert
BEFORE INSERT
ON cart
FOR EACH ROW
  SET NEW.orderDate = CURDATE(), NEW.statusDate = CURDATE();
CREATE TRIGGER cart_update
BEFORE UPDATE
ON cart
FOR EACH ROW
  SET NEW.statusDate = CURDATE();


# creating cart-list table - list of booked products.
create table cart_list(
  id int(20) not null auto_increment,
  cartId int(20) not null,
  price int(20) not null,
  number int(20) not null,
  productId int(20) not null,
  primary key (id)
) default character set utf8;


/* ------ ----------------*/


# products table - list of products
select * from products where list_type="bathroom";
describe products;
drop table products;
select * from products;
select * from products_list where type='living_room' and id =10731;
select * from products where list_type='childrens_ikea' and list_id ='18682';
select * from users;
select * from products where id=00081591;
SELECT COUNT(id) FROM products;


# products_list table - list of products categories.
select * from products_list; #where header="Мягкая мебель";


# users table
describe users;
drop table users;
select * from users;


# cart table : requests;
select * from cart;
drop table cart;
select * from cart;

#cart_list table :
describe cart_list;
drop table cart_list;
select * from cart_list;

# other requests;

show tables;
show triggers;
drop table cart;
