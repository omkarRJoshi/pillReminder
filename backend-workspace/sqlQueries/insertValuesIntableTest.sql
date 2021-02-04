use test;

insert into user values
("user1", "anand", "anand@andy.com", "8451629584", "india", "11-11-2011", "andy123", "A+", 80, 8);

insert into user values
("user2", "omkar", "omkar@andy.com", "8451629584", "india", "11-11-2011", "andy123", "A+", 80, 8);

insert into dependent values
("dep1", "user1", "mother", "mom", "asa@jsdj", "6561561", "12546", "B+", 60, 7);

insert into dependent values
("dep2", "user1", "father", "papa", "asa@jsdj", "6561561", "12546", "B+", 60, 7),
("dep3", "user1", "children", "asa", "asa@jsdj", "6561561", "12546", "B+", 60, 7),
("dep4", "user1", "spouce", "spauce", "asa@jsdj", "6561561", "12546", "B+", 60, 7);

insert into dependent values
("dep5", "user2", "father", "papa", "asa@jsdj", "6561561", "12546", "B+", 60, 7),
("dep6", "user2", "mother", "asa", "asa@jsdj", "6561561", "12546", "B+", 60, 7);


insert into MedicalHistory values
("history1", "dep1", "user1", "animia", "pns", "pnsPill", "12-1-2021", "30-2-2021", 5, "2pm", true),
("history2", "user1", "user1", "nausia", "pns", "pnsPill", "12-1-2021", "30-2-2021", 5, "2pm", false),
("history3", "user2", "user2", "nausia", "pns", "pnsPill", "12-1-2021", "30-2-2021", 5, "2pm", false),
("history4", "dept5", "user2", "no-illness", "pns", "pnsPill", "12-1-2021", "30-2-2021", 5, "2pm", false),
("history5", "dept2", "user1", "allergy", "pushpak", "pushPill", "12-1-2021", "30-2-2021", 5, "2pm", false);

Insert into dependent (dependentId, userId, relation, name, emailid, contactNo, bloodGroup, dob, weight, height) values ('user1', 'javaDependent1', 'javaReln', 'omkar', 'uniqueEmail@mail.com', '9545982650', 'B+', '1998-06-12', 55.2, 5.7)