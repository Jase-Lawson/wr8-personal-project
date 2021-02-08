insert into cart (
customer_id
) values (
${customer_id}
) returning cart_id;