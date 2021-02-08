insert into cart_item (
  cart_id,
  product_id,
  quantity,
  customer_id
) values (
(select cart_id from cart where customer_id = ${customer_id}),
  ${product_id},
  ${quantity},
  ${customer_id}
)
returning cart_id, product_id, quantity;




-- IF YOURE READING THIS ITS TOO LATE