insert into cart_item (
  cart_id,
  product_id,
  quantity,
) values (
  ${cartId},
  ${productId},
  ${quantity}
)
returning cart_id, product_id, quantity;