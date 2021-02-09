update cart_item
set quantity = ${quantity}
where junction_id = ${junction_id} 

returning quantity;