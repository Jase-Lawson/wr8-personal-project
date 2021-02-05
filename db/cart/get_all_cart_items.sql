select p.name, p.price, p.img, ci.quantity
from cart_item ci
join customer c on c.customer_id = ci.customer_id
join product p on ci.product_id = p.product_id
where c.customer_id = ${customerId};