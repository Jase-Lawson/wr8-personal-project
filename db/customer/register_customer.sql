insert into customer (
  first_name,
  last_name,
  password,
  email,
  phone,
  isAdmin
) values (
 ${firstName},
  ${lastName},
  ${hash},
  lower(${email}),
  ${phone},
  false
)
returning customer_id, first_name, email;