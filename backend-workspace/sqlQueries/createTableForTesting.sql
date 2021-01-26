create database test;
use test;
create table user
(id int auto_increment, firstName varchar(20),
 lastName varchar(20), email varchar(50), password varchar(20), primary key(id));

select * from user;