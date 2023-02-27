require('../models/db')
const User = require('../models/users')
const Account = require('../models/account')
const Product = require('../models/products')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const checkAuth = require('../middleware/checkAuth')
const localStorage = require('localStorage');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
var dollarsToCents = require('dollars-to-cents')

exports.getUser = async (req, res) => {

  let { id } = req.params;
  const idNum = parseInt(id);

  try {
    const data = await User.find({})
    res.json(data[idNum - 1])
  } catch (e) {
      res.status(400).json( { message: e } )
  }
  res.json(id)

}

exports.getCart = async (req, res) => {

      let { id } = req.params;
      const idNum = parseInt(id);

      try {

        const data = await User.find({})
        const user = data[idNum - 1]
        res.json(user["cart"])

      } catch (e) {
          res.status(400).json( { message: e } )
      }
}

exports.getWish = async (req, res) => {

      let { id } = req.params;
      const idNum = parseInt(id);

      try {

        const data = await User.find({})
        const user = data[idNum - 1]
        res.json(user["wishlist"])

      } catch (e) {
          res.status(400).json( { message: e } )
      }
}

exports.addCart = async (req, res) => {

  let { id } = req.params;
  const idNum = parseInt(id);

  let { product }  = req.query;

  try {
    const data = await User.find({})
    const user = data[idNum - 1]
    const cart = user["cart"]
    cart.push(product)
    const updateCart = await User.updateOne( { id:id }, { cart:cart } )
    res.json(updateCart)

  } catch (e) {
        res.status(400).json( { message: e } )
  }

}

exports.addWish = async (req, res) => {

    let { id } = req.params;
    const idNum = parseInt(id);

    let { product }  = req.query;

    try {
      const data = await User.find({})
      const user = data[idNum - 1]
      const wish = user["wishlist"]
      wish.push(product)
      const updateWish = await User.updateOne( { id:id }, { wishlist:wish } )
      res.json(updateWish)

    } catch (e) {
          res.status(400).json( { message: e } )
    }
}

exports.addUser = async (req, res) => {
    try {

      const data = await User.find({})

      idVar = data.length + 1;

      User.find({ email: req.body.email })
        .exec()
        .then(user => {
          if (user.length >= 1) {
            return res.status(409).json({
              message: "Mail Exists"
            });
          } else {

      bcrypt.hash(req.body.password, 10, (e, hash) => {
        if (e) {
          error: e
        } else {

          const newUser = new User({
            id: idVar,
            username: req.body.username,
            password: hash,
            email: req.body.email
          })
          newUser.save().then(res.json(newUser)).then(
          console.log("New User: " + req.body.username + " Registered with ID " + idVar)
        )}
      })
      }
    })
    } catch (e) {
      res.status(400).json( { message: e } )
    }
}

exports.deleteCart = async (req, res) => {
  let { id } = req.params;
  const idNum = parseInt(id);

  let { product }  = req.query;

  try {
    const data = await User.find({})
    const user = data[idNum - 1]
    const cart = user["cart"]

    const removed = [];

    for (var i = 0; i < cart.length; i++) {
      if (!(cart[i] == product)) {
        removed.push(cart[i])
      }
    }

    const updateCart = await User.updateOne( { id:id }, { cart:removed } )
    res.json(updateCart)

  } catch (e) {
        res.status(400).json( { message: e } )
  }

}

exports.deleteWish = async (req, res) => {
  let { id } = req.params;
  const idNum = parseInt(id);

  let { product }  = req.query;

  try {
    const data = await User.find({})
    const user = data[idNum - 1]
    const wish = user["wishlist"]

    const removed = [];

    for (var i = 0; i < wish.length; i++) {
      if (!(wish[i] == product)) {
        removed.push(wish[i])
      }
    }

    const updateWish = await User.updateOne( { id:id }, { wishlist:removed } )
    res.json(updateWish)

  } catch (e) {
        res.status(400).json( { message: e } )
  }
}

exports.deleteUser = async (req, res) => {

  if (req.params.id != 0) {
  User.remove({id: req.params.id}).exec().then(result => {
    res.json({message: "User Deleted"})
  })
} else {
  res.json({message: "No User Found"})
}
}

exports.login = async (req, res) => {

  User.find({ email: req.body.email }).exec().then(user => {
    if (user.length < 1) {
      return res.status(401).json({message:"Auth Failed"})
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({message:"Auth Failed"})
      }
      if (result) {
        const token = jwt.sign({
          email: user[0].email,
          id: user[0].id
        }, process.env.JWT_KEY,
        {
          expiresIn:"1h"
        })

        localStorage.setItem('Authentication', JSON.stringify(token));

        return res.status(200).json({message:"Auth Successful", token: token})
      }
      return res.status(401).json({message:"Auth Failed"})
    })
  })
}

exports.logout = async (req, res) => {
  localStorage.setItem('Authentication', JSON.stringify(null))
}

exports.myCart = async (req, res) => {
  try {
    token = localStorage.getItem('Authentication').replace(/["]+/g, '');
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const id = decoded.id
    const data = await User.find({})
    const user = data[id - 1]
    res.json(user["cart"])
  } catch (e) {}
}

exports.myWish = async (req, res) => {
  try {
    token = localStorage.getItem('Authentication').replace(/["]+/g, '');
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const id = decoded.id
    const data = await User.find({})
    const user = data[id - 1]
    res.json(user["wishlist"])
  } catch (e) {
      console.log(e)
  }
}

exports.addMyCart = async (req, res) => {

  let { id } = req.params;

  try {

    if (localStorage.getItem('Authentication') != null) {
      token = localStorage.getItem('Authentication').replace(/["]+/g, '');
      const decoded = jwt.verify(token, process.env.JWT_KEY)
      const userId = decoded.id
      const data = await User.find({})
      const pData = await Product.find({})
      const user = data[userId - 1]
      const cart = user["cart"]

      if (!pData[id - 1].sold) {

        cart.push(id)
        const updateCart = await User.updateOne( { id:userId }, { cart:cart } )
        res.json(updateCart)

      } else {

        res.status(400).json({message:"Error"})

      }
    } else {

      if (localStorage.getItem('cart') != null) {
      var cart = localStorage.getItem('cart').replace(/["]+/g, '').replace(/\[|\]/g,'').split(',');
      cart.push(id)
      localStorage.setItem('cart', JSON.stringify(cart.toString()));
      console.log(localStorage.getItem('cart'))
        } else {

          var cart = [id]
          localStorage.setItem('cart', JSON.stringify(cart.toString()));
          console.log(localStorage.get('cart'))
        }

    }

  } catch (e) {}
}

exports.addMyWish = async (req, res) => {

  let { id } = req.params;

  try {
    if (localStorage.getItem('Authentication') != null) {
    token = localStorage.getItem('Authentication').replace(/["]+/g, '');
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const userId = decoded.id
    const data = await User.find({})
    const pData = await Product.find({})
    const user = data[userId - 1]
    const wish = user["wishlist"]

    if (!pData[id - 1].sold) {

      wish.push(id)
      const updateWish = await User.updateOne( { id:userId }, { wishlist:wish } )
      res.json(updateWish)

    } else {

      res.status(400).json({message:"Error"})

    }
  } else {

    if (localStorage.getItem('wish') != null || localStorage.getItem('wish') == "") {
    var wish = localStorage.getItem('wish').replace(/["]+/g, '').replace(/\[|\]/g,'').split(',');
    wish.push(id)
    localStorage.setItem('wish', JSON.stringify(wish.toString()));
      } else {

        var wish = [id]
        localStorage.setItem('wish', JSON.stringify(wish.toString()));

    }

  }

  } catch (e) {}
}

exports.deleteMyCart = async (req, res) => {

  let { id } = req.params;

  try {

    if (localStorage.getItem('Authentication') != null) {

    token = localStorage.getItem('Authentication').replace(/["]+/g, '');
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const userId = decoded.id
    const data = await User.find({})
    const user = data[userId - 1]
    const cart = user["cart"]
    const removed = [];

    for (var i = 0; i < cart.length; i++) {
      if (!(cart[i] == id)) {
        removed.push(cart[i])
      }
    }

    const updateCart = await User.updateOne( { id:userId }, { cart:removed } )
    res.json(updateCart)

  } else {


    if (localStorage.getItem('cart') != null) {
    var cart = localStorage.getItem('cart').replace(/["]+/g, '').replace(/\[|\]/g,'').split(',');
    var filtered = []

    for (var i = 0; i < cart.length; i++) {
      if (cart[i] != id.toString()) {
        filtered.push(cart[i])
      }
    }

    if (filtered.length == 0) {

      localStorage.clear('cart')

    } else {

      localStorage.setItem('cart', JSON.stringify(filtered.toString()));

    }

      } else {

    }

  }

  } catch (e) {}
}

exports.deleteMyWish = async (req, res) => {

  let { id } = req.params;

  try {
    if (localStorage.getItem('Authentication') != null) {
    token = localStorage.getItem('Authentication').replace(/["]+/g, '');
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const userId = decoded.id
    const data = await User.find({})
    const user = data[userId - 1]
    const wish = user["wishlist"]
    const removed = [];

    for (var i = 0; i < wish.length; i++) {
      if (!(wish[i] == id)) {
        removed.push(wish[i])
      }
    }

    const updateWish = await User.updateOne( { id:userId }, { wishlist:removed } )
    res.json(updateWish)
  } else {

    if (localStorage.getItem('wish') != null) {
    var wish = localStorage.getItem('wish').replace(/["]+/g, '').replace(/\[|\]/g,'').split(',');
    var filtered = []

    for (var i = 0; i < wish.length; i++) {
      if (wish[i] != id.toString()) {
        filtered.push(wish[i])
      }
    }

    if (filtered.length == 0) {

      localStorage.clear('wish')

    } else {

      localStorage.setItem('wish', JSON.stringify(filtered.toString()));

    }

      } else {

    }

    console.log(localStorage.getItem('wish'))

  }

  } catch (e) {
      console.log(e)
  }
}

exports.me = async (req, res) => {

    try {
      token = localStorage.getItem('Authentication').replace(/["]+/g, '');
      const decoded = jwt.verify(token, process.env.JWT_KEY)
      const userId = decoded.id
      const data = await User.find({})
      res.status(200).json(data[userId - 1])
    } catch (e) {
      res.status(400).json({message:"Error"})
    }

}

exports.register = async (req, res) => {

  try {

          const data = await User.find({})

          idVar = data.length + 1;

          User.find({ email: req.body.email })
            .exec()
            .then(user => {
              if (user.length >= 1) {
                return res.status(409).json({
                  message: "Mail Exists"
                });
              } else {

          bcrypt.hash(req.body.password, 10, (e, hash) => {
            if (e) {
              console.log(e)
            } else {
              try {

                const newUser = new User({
                  id: idVar,
                  username: req.body.username,
                  password: hash,
                  email: req.body.email
                })

                const newAccount = new Account({
                  id: idVar,
                  firstName: req.body.firstName,
                  middleName: req.body.middleName,
                  lastName: req.body.lastName,
                  username: req.body.username,
                  email: req.body.email,
                  type: req.body.type,
                  address: req.body.address,
                  city: req.body.city,
                  country: req.body.country,
                  zip: req.body.zip,
                  image: req.body.image
                })

                newUser.save().then(newAccount.save()).then(res.json({newAccount}))
                .then(console.log("New Account: " + req.body.username + " Registered with ID " + idVar))

              } catch (e) {
              }
            }
          })
          }
        })


  } catch (e) {
    res.status(401).json({ message:"Error" })
    console.log(e)
  }
}

exports.account = async (req, res) => {

    try {
      token = localStorage.getItem('Authentication').replace(/["]+/g, '');
      const decoded = jwt.verify(token, process.env.JWT_KEY)
      const userId = decoded.id
      const data = await Account.find({})
      res.status(200).json(data[userId - 1])
    } catch (e) {
      res.status(400).json({message:"Error"})
    }

}

exports.update = async (req, res) => {

  try {

    token = localStorage.getItem('Authentication').replace(/["]+/g, '');
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const userId = decoded.id
    const data = await Account.find({})
    const user = data[userId - 1]

    const update = req.body.item
    const value = req.body.value

    const updateItem = await Account.updateOne( { id:userId }, { [update]:value } )
    res.json(updateItem)

  } catch (e) {
    res.status(400).json({message:"Error"})
    console.log(e)
  }

}

exports.checkout = async (req, res) => {

  try {
    token = localStorage.getItem('Authentication').replace(/["]+/g, '');
    shouldPass = true;
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const userId = decoded.id
    const data = await User.find({})
    const user = data[userId - 1]
    const pData = await Product.find({})

    const shipping = user.cart.length * 150 * 100;

    for (var i = 0; i < user.cart.length; i++) {
      if (pData[user.cart[i] - 1].sold) {
        shouldPass = false
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US']
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shipping,
              currency: 'usd',
            },
            display_name: 'Standard Shipping',
          }
        },
      ],
      customer_email:user.email,
      line_items: user.cart.map(item => {

        const product = pData[item - 1]

        return {
          price_data: {
            currency:'usd',
            product_data: {
              name:product.title
            },
            unit_amount: dollarsToCents(product.price)
          },
          quantity: 1
        }

      }),
      success_url: "http://127.0.0.1:3000/checkout.html?session={CHECKOUT_SESSION_ID}",
      cancel_url: "http://127.0.0.1:3000/cart.html"
    })

    if (shouldPass) {
      res.status(200).json({url:session.url})
    } else {
      res.status(200).json({url:"http://127.0.0.1:3000/cart.html"})
    }

  } catch (e) {
    res.status(400).json({message:"Error"})
  }

}

exports.finishCheckout = async (req, res) => {
  try {

    const data = await Product.find({})
    session = req.body.session
    const id = await stripe.checkout.sessions.retrieve(session)
    cart = []
    userId = 0;
    const users = await User.find({})
    if (id.payment_status == "paid") {

    await User.find({ email: id.customer_details.email }).exec().then(user => {
      cart = user[0].cart
      userId = user[0].id
    })

    await User.updateOne( { id:userId }, { cart:[] } )

   for (let i = 0; i < cart.length; i++) {
     val = cart[i]
     product = data[val - 1]
     console.log("Product \"" + product.title + "\" Sold.")

     for (var j = 0; j < users.length; j++) {

       jCart = users[j].cart
       nCart = [];

       jWish = users[j].wishlist
       nWish = [];

       for (var k = 0; k < jCart.length; k++) {
         if (!jCart[k] == product.id) {
           nCart.push(jCart[k])
         }
       }

       for (var l = 0; l < jWish.length; l++) {
         if (!jWish[l] == product.id) {
           nWish.push(jWish[l])
         }
       }

       await User.updateMany( { id:j+1 }, { $set: {cart:nCart} } )
       await User.updateMany( { id:j+1 }, { $set: {wishlist:nWish} } )


     }

     await Product.updateOne( { id:product.id }, { sold:true } )

   }

   res.status(200).json({url:"http://localhost:3000/index.html"})

  } else {
      res.status(200).json({url:"http://localhost:3000/cart.html"})
    }

  } catch (e) {

  }
}
