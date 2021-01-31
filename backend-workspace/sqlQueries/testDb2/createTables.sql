create database testDb2;

use testDb2;

create table person (
	personId varchar(32) not null, 
	name varchar(50) not null, 
	email varchar(50) not null, 
	contact varchar(15),
	dob date,
	bloodGroup varchar(5),
	weight float,
	height float,
	primary key (personId),
    UNIQUE (email)
);

create table user (
	userId varchar(32) not null references person(personId),
    email varchar(50) not null,
    country varchar(50),
    password varchar(50) not null,
    primary key (userId),
    UNIQUE (email)
);

create table relation(
	userId varchar(32) not null,
    dependentId varchar(32) not null references person(personId),
    relation varchar(50),
    foreign key (userId) references person(personId)
);

create table MedicalHistory(
	historyId varchar(40) not null,
	personId varchar(40) not null,
    illness varchar(40),
    doctorDetails varchar(40),
    medicine varchar(40),
    startDate date,
    endDate date,
    dosageAmt float,
    dosageTime time,
    emailNotfication boolean,
    primary key (historyId),
    foreign key (personId) references person(personId)
);

-- ALTER TABLE user
-- ADD UNIQUE (email); 
-- delete from person where personId = '82f5d4fdbe1c4583a207560edf168e1f';
select * from person;
select * from relation;
select * from user;