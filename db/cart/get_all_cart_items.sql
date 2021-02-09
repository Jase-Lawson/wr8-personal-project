select p.name, p.price, p.img, ci.quantity, p.product_id, ci.junction_id
from cart_item ci
join customer c on c.customer_id = ci.customer_id
join product p on ci.product_id = p.product_id
where c.customer_id = ${customer_id};