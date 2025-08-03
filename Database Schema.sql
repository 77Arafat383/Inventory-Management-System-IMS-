create database if not exists inventory_db;
use inventory_db;

create table users (
id int auto_increment primary key,
name varchar(100),
email varchar(100) unique,
password varchar(255),
created_at timestamp default current_timestamp
);

create table products (
 id int auto_increment primary key,
 user_id int, 
 name varchar(100),
 category varchar(100),
 quantity int,
 price decimal (10,2),
 created_at timestamp default current_timestamp,
 foreign key (user_id) references users(id) on delete cascade
);