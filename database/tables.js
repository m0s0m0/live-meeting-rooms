CREATE TABLE company (
	name varchar(100),
	domain varchar(100),
	email_extension varchar(100)
);

CREATE TABLE staff_users (
	name varchar(100),
	email varchar(100),
	company_id integer,
	password varchar(600),

);

CREATE TABLE permissions(
	name varchar(100),
	code integer
);

CREATE TABLE user_permissions(
	user_id integer,
	mobile varchar(15),
	email varchar(15),
	permissions text
);

CREATE TABLE users (
    email varchar(100),
    mobile varchar(15),
    company_id integer null,
    name varchar(100),
    department varchar(100),
    password varchar(600)
);


