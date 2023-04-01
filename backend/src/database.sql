-- Active: 1667399981924@@127.0.0.1@3306@rss_parser

USE rss_parser;

CREATE TABLE
    feeds (
        id INT(11) NOT NULL AUTO_INCREMENT,
        creator VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        link VARCHAR(255) NOT NULL,
        pub_date VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );

DROP TABLE feeds;

SELECT * FROM feeds;