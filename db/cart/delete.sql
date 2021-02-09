delete from cart_item
where customer_id = ${customer_id}
and product_id = ${product_id}
and junction_id = ${junction_id}