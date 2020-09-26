CREATE TABLE company (
	name varchar(100),
	domain varchar(100),
	email_extension varchar(100)
);


CREATE TABLE user (
    email varchar(100),
    mobile varchar(15),
    company_id integer null,
    name varchar(100),
    department varchar(100),
    password varchar(600),
    roles text
);


