create table customer (
customer_id serial primary key,
first_name varchar(60) not null,
last_name varchar(60) not null,
email varchar(200) not null ,
phone varchar(60) not null,
birthdate date,
address varchar(100) ,
city varchar(60) ,
state varchar(60) ,
zip_code varchar(60) ,
password varchar(100) not null,
isAdmin boolean not null
);

create table product (
product_id serial primary key,
name varchar(150),
product_category varchar(60),
sku varchar(200) unique,
price numeric,
img text
);

create table invoice (
invoice_id serial primary key,
customer_id int references customer(customer_id),
invoice_date timestamp not null,
billing_address varchar(100) not null,
billing_city varchar(60) not null,
billing_state varchar(60) not null,
billing_zip varchar(60) not null,
total numeric
);

create table cart (
cart_id serial primary key,
customer_id int references customer(customer_id)
);

create table cart_item (
junction_id serial primary key,
cart_id int references cart(cart_id),
product_id int references product(product_id),
customer_id int references customer(customer_id),
quantity int
);

