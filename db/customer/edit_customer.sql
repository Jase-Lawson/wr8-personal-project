update customer
set first_name = ${firstName},
last_name = ${lastName},
email = lower(${email}),
phone = ${phone},
address = ${address},
city = ${city},
state = ${state},
zip_code = ${zipCode}
where customer_id = ${customer_id}

returning customer_id, first_name, email;