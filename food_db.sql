SET client_encoding = 'UTF8';

-- Disable unique and foreign key checks temporarily
SET session_replication_role = replica;

-- Creating tables

CREATE TABLE "user" (
  user_id SERIAL PRIMARY KEY,
  full_name VARCHAR(255),
  email VARCHAR(255),
  pass_word VARCHAR(255)
);

CREATE TABLE food_type (
  type_id SERIAL PRIMARY KEY,
  type_name VARCHAR(255)
);

CREATE TABLE food (
  food_id SERIAL PRIMARY KEY,
  food_name VARCHAR(255),
  image VARCHAR(255),
  price INTEGER,
  description VARCHAR(255),
  type_id INTEGER,
  FOREIGN KEY (type_id) REFERENCES food_type(type_id)
);
CREATE TABLE restaurant (
  res_id SERIAL PRIMARY KEY,
  res_name VARCHAR(255),
  image VARCHAR(255),
  description VARCHAR(255)
);

CREATE TABLE like_res (
  user_id INTEGER NOT NULL,
  res_id INTEGER NOT NULL,
  date_like TIMESTAMP,
  PRIMARY KEY (user_id, res_id),
  FOREIGN KEY (user_id) REFERENCES "user"(user_id),
  FOREIGN KEY (res_id) REFERENCES restaurant(res_id)
);

CREATE TABLE sub_food (
  sub_id SERIAL PRIMARY KEY,
  sub_name VARCHAR(255),
  sub_price INTEGER,
  food_id INTEGER,
  FOREIGN KEY (food_id) REFERENCES food(food_id)
);
CREATE TABLE "order" (
  user_id INTEGER NOT NULL,
  food_id INTEGER NOT NULL,
  amount INTEGER,
  code VARCHAR(255),
  arr_sub_id VARCHAR(255),
  PRIMARY KEY (user_id, food_id),
  FOREIGN KEY (user_id) REFERENCES "user"(user_id),
  FOREIGN KEY (food_id) REFERENCES food(food_id)
);

CREATE TABLE rate_res (
  user_id INTEGER NOT NULL,
  res_id INTEGER NOT NULL,
  amount INTEGER,
  date_rate TIMESTAMP,
  PRIMARY KEY (user_id, res_id),
  FOREIGN KEY (user_id) REFERENCES "user"(user_id),
  FOREIGN KEY (res_id) REFERENCES restaurant(res_id)
);





-- Inserting data
INSERT INTO food (food_name, image, price, description, type_id) VALUES
('Coke', 'https://medicare.vn/wp-content/uploads/2021/01/0063149.jpg', 5, 'coca cola', 1),
('Heniken', 'https://minhcaumart.vn/media/com_eshop/products/8934822212339.jpg', 10, 'đây là bia', 1),
('Burger', 'https://burgerking.vn/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/c/r/crunchy_whp-min_1.jpg', 7, 'hum bơ gơ', 2),
('Hủ tiếu', 'https://daubepgiadinh.vn/wp-content/uploads/2018/05/hinh-hu-tiu-nam-vang.jpg', 30, 'hủ tiếu gõ', 3),
('Bún bò', 'https://i.ytimg.com/vi/A_o2qfaTgKs/maxresdefault.jpg', 50, 'bún bòa', 3),
('Khoai tây chiên', 'http://icdn.dantri.com.vn/zoom/1200_630/2017/khoai-tay-chien-1497363342895.jpg', 100, 'potato', 2),
('Sandwich', 'https://monngonmoingay.com/wp-content/uploads/2020/12/sandwich-kep-cha-tom-500.jpg', 2, 'san quýt', 2),
('Đồ chay', 'https://cdn.tgdd.vn/Files/2022/03/21/1421421/tong-hop-16-cach-lam-mon-chay-thanh-dam-dinh-duong-tai-nha-202203211050443101.jpg', 1, 'đây là đồ ăn chay', 5),
('Bánh tráng', 'https://res.klook.com/image/upload/q_85/c_fill,w_750/v1596008298/blog/eibedalo0wncojkerkpg.jpg', 33, 'bánh cháng', 4),
('xúc xích', 'https://www.tvpfood.com/image/cache/catalog/product/san-pham-xien-que-tiec/xuc-xich-berlin-03-1024x1024.png', 22, 'sút sít', 4);

INSERT INTO food_type (type_name) VALUES
('Thức uống'),
('Thức ăn nhanh'),
('Món nước'),
('Ăn vặt'),
('Chay');

INSERT INTO like_res (user_id, res_id, date_like) VALUES
(1, 1, '2022-01-01 09:00:00'),
(1, 2, '2022-01-01 09:00:00'),
(1, 3, '2022-01-01 09:00:00'),
(2, 2, '2022-01-01 09:00:00'),
(2, 3, '2022-01-01 09:00:00'),
(3, 1, '2022-01-01 09:00:00');

INSERT INTO "order" (user_id, food_id, amount, code, arr_sub_id) VALUES
(1, 1, 3, '', '[1,2]'),
(1, 2, 2, '', '[4,5]'),
(3, 1, 1, '', ''),
(3, 4, 1, '', ''),
(3, 5, 5, '', ''),
(3, 8, 10, '', ''),
(3, 9, 10, '', '[1,2,3]'),
(3, 10, 10, '', '');

INSERT INTO rate_res (user_id, res_id, amount, date_rate) VALUES
(1, 2, 4, '2022-01-01 09:00:00'),
(1, 3, 5, '2022-01-01 09:00:00'),
(2, 1, 3, '2022-01-01 09:00:00'),
(2, 3, 3, '2022-01-01 09:00:00');

INSERT INTO restaurant (res_name, image, description) VALUES
('Phúc Long', 'https://static.mservice.io/placebrand/s/momo-upload-api-200218150929-637176353692616410.jpg', 'pl'),
('KFC', '/public/img/1659847246771_test.mp4', 'kfc'),
('Kichi kichi', 'https://aeonmall-haiphong-lechan.com.vn/wp-content/uploads/2020/09/25.-kichi-kichi.jpg', 'kckc');

INSERT INTO sub_food (sub_name, sub_price, food_id) VALUES
('Hành phi', 1, 4),
('Hành phi', 1, 5),
('Hành phi', 1, 8),
('Trân châu', 2, 1),
('Trân châu', 2, 2),
('tương ớt', 2, 3),
('tương ớt', 2, 10);

INSERT INTO "user" (full_name, email, pass_word) VALUES
('Tony', 'tony@gmail.com', '1234'),
('John wick', 'john@gmail.com', '1234'),
('Peter', 'pi@gmail.com', '1234'),
('Kang', 'kang@gmail.com', '1234'),
('movie 3', 'phim số 3', '123456'),
('', '', ''),
('abc', 'abc@gmail.com', '$2b$10$tkFIqg.QZbwr33SBNaf4re0HXC6bIrRf/49PwDWa.ulh/8bkXVKXy'),
('graphql', 'grap@gmail.com', '1234'),
('graphql', 'grap@gmail.com', '1234'),
('graphql', 'grap@gmail.com', '1234');

-- Re-enable unique and foreign key checks
SET session_replication_role = origin;