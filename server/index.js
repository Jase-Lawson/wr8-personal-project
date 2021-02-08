require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const authCtrl = require('./controllers/authController');
const cartCtrl = require('./controllers/cartController');
const productCtrl = require('./controllers/productController');
const app = express();

app.use(express.json())
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: { maxAge: 1000 * 60 * 60 }
}))

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
  app.set('db', db)
  console.log('db connected')
  app.listen(SERVER_PORT, () => console.log(`Listening on Port: ${SERVER_PORT}`));
})

// auth endpoints
app.get('/auth/customer', authCtrl.getCustomer)
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.put('/auth/edit', authCtrl.edit)

// cart endpoints

app.get(`/api/cart`, cartCtrl.getCart)
app.post('/api/cart', cartCtrl.addToCart)
app.put('/api/cart', cartCtrl.changeQuantity)
app.delete('/api/cart', cartCtrl.deleteCart)

// product endpoints

app.get(`/api/product/:product_id`, productCtrl.getProduct)
app.get('/api/products', productCtrl.getProducts)
app.post('/api/product', productCtrl.add)
app.put('/api/product', productCtrl.edit)
app.delete('/api/product', productCtrl.delete)


