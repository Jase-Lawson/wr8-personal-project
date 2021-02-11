require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const authCtrl = require('./controllers/authController');
const cartCtrl = require('./controllers/cartController');
const productCtrl = require('./controllers/productController');
const path = require('path')
const app = express();

app.use(express.static(__dirname + '/../build'))

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build.index.html'))
// })


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
app.put('/api/cart', cartCtrl.updateQuantity)
app.delete('/api/cart/:junction_id', cartCtrl.deleteItem)

// product endpoints

app.get(`/api/product/:product_id`, productCtrl.getProduct)
app.get('/api/products', productCtrl.getProducts)
app.post('/api/product', productCtrl.add)
app.put('/api/product', productCtrl.edit)
app.delete('/api/product', productCtrl.delete)

// payment endpoints

app.post('/api/payment', function (req, res, next) {
  //convert amount to pennies
  const amountArray = req.body.amount.toString().split('');
  const pennies = [];
  for (var i = 0; i < amountArray.length; i++) {
    if (amountArray[i] === ".") {
      if (typeof amountArray[i + 1] === "string") {
        pennies.push(amountArray[i + 1]);
      } else {
        pennies.push("0");
      }
      if (typeof amountArray[i + 2] === "string") {
        pennies.push(amountArray[i + 2]);
      } else {
        pennies.push("0");
      }
      break;
    } else {
      pennies.push(amountArray[i])
    }
  }
  const convertedAmt = parseInt(pennies.join(''));

  const charge = stripe.charges.create({
    amount: convertedAmt, // amount in cents, again
    currency: 'usd',
    source: req.body.token.id,
    description: 'Test charge from react app'
  }, function (err, charge) {
    if (err) return res.sendStatus(500)
    return res.sendStatus(200);
    // if (err && err.type === 'StripeCardError') {
    //   // The card has been declined
    // }
  });
});
