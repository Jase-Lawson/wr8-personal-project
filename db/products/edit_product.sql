update product
set name = ${name},
product_category = ${category},
sku = ${sku},
price = ${price},
img = ${img}
where sku = ${sku};