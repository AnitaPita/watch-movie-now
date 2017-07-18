﻿CREATE TABLE Users ( --"User" I think is reserved
USERID CHAR(10) PRIMARY KEY,
USERNAME VARCHAR(30),
PW VARCHAR(15),
LNAME VARCHAR(15),
FNAME VARCHAR(15),
EMAIL VARCHAR(30),
CITY VARCHAR(15),
PROVINCE VARCHAR(15),
COUNTRY VARCHAR(15)
);

CREATE TABLE Actor (
ACTORID VARCHAR(10) PRIMARY KEY,
actor_name VARCHAR(50)
);

CREATE TABLE Director(
DID VARCHAR(10) PRIMARY KEY,
DIRECTOR_NAME VARCHAR(15)
);

CREATE TABLE Movie (
MOVIEID VARCHAR(10) PRIMARY KEY,
MOVIETITLE VARCHAR(50) NOT NULL,
LANG VARCHAR(15),
YEAR_RELEASED DATE NOT NULL,
RUNTIME INTEGER,
SUMMARY VARCHAR(1000),
MPA_RATING VARCHAR(7), --Max is "Unrated"
TOTAL_RATERS INTEGER,
COMMUNITY_RATING DECIMAL(2,1), --Max is 10.0
); 

CREATE TABLE Directs(
DID VARCHAR(10) REFERENCES Director(DID),
MOVIEID VARCHAR(10) REFERENCES Movie(MOVIEID),
PRIMARY KEY(DID,MOVIEID)
);


CREATE TABLE Role_In_Movie (
ROLENAME VARCHAR(20), 
ACTORID VARCHAR(10) REFERENCES Actor(ACTORID),
MOVIEID VARCHAR(10) REFERENCES Movie(MOVIEID),
PRIMARY KEY(ROLENAME,ACTORID,MOVIEID)
);

CREATE TABLE Genres(
GENREID VARCHAR(10) PRIMARY KEY,
GENRE_NAME VARCHAR(20)
);

CREATE TABLE genre_relation(
genreid VARCHAR(10) REFERENCES genres(genreid),
movieid VARCHAR(10) REFERENCES Movie(movieid),
PRIMARY KEY(genreid,movieid)
)