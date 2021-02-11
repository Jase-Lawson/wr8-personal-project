select * from product 
where product_id = $1
returning product_id;