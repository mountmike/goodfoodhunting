CREATE DATABASE goodfoodhunting;

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    image_url TEXT,
);

insert into dishes (title, image_url) values ('Spagbol', 'https://veganonboard.com/wp-content/uploads/2021/05/vegan-spaghetti-bolognese-square.jpeg');

insert into dishes (title, image_url) values ('Cake', 'https://veganonboard.com/wp-content/uploads/2021/05/vegan-spaghetti-bolognese-square.jpeg');

insert into dishes (title, image_url) values ('Cake', 'https://thebakingexplorer.com/wp-content/uploads/2022/04/ChocBirthdayCake2-Copy.jpg');

alter table dishes
add venue text,
add city text,
add postDateTime timestamp;

update dishes
set venue = 'Pete''s Fish n Chips',
city = 'Benalla',
postDateTime = timestamp
where id = 10;

insert into dishes (title, image_url, venue, city, postDateTime) values ('Spagbol', 'https://veganonboard.com/wp-content/uploads/2021/05/vegan-spaghetti-bolognese-square.jpeg', 'Pete''s Fish n Chips', 'Benalla', CURRENT_TIMESTAMP);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email text,
    password_digest text
);

insert into users (email, password) values ('micktharratt@hotmail.com', '123');
insert into users (email, password) values ('laurelkirkwood@live.com', 'abc');

ALTER TABLE dishes ADD COLUMN user_id INTEGER;

SELECT id, email from users where id = 1;
