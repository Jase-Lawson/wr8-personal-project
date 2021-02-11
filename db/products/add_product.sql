insert into product (
name,
product_category,
sku,
price,
img
) values (
${name},
${category},
${sku},
${price},
${img}
)
returning product_id, url;