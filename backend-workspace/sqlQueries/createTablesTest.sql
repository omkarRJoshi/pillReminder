use test;
show tables;
-- drop table user;
-- drop table dependent;

create table user (
userId varchar(40) not null, 
name varchar(50), 
emailid varchar(50), 
contactNo varchar(11),
country varchar(50),
dob varchar(12),
password varchar(50),
bloodGroup varchar(5),
weight float,
height float,
primary key (userId)
);

create table dependent(
	dependentId varchar(40) not null, 
    userId varchar(40) not null,
    relation varchar(20),
    name varchar(50), 
	emailid varchar(50), 
	contactNo varchar(11),
	dob varchar(12),
	bloodGroup varchar(5),
	weight float,
	height float,
    primary key (dependentId),
    foreign key (userId) references user(userId)
);

create table MedicalHistory(
	historyId varchar(40) not null,
	personId varchar(40) not null,
    userId varchar(40) not null,
    illness varchar(40),
    doctorDetails varchar(40),
    medicine varchar(40),
    startDate varchar(40),
    endDate varchar(40),
    dosageAmt float,
    dosageTime varchar(40),
    emailNotfication boolean,
    primary key (historyId),
    foreign key (userId) references user(userId)
);