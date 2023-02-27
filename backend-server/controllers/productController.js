require('../models/db')
const Product = require('../models/products')

/*
 * /api/products
 * GET All OR Single Product
*/

exports.getProduct = async (req, res) => {

  let { limit } = req.query;
  let { id } = req.params;

  const limitRecords = parseInt(limit);
  const idNum = parseInt(id);

  if (id != null && id != 0) {

    try {

        const data = await Product.find({}).limit(limitRecords)
        const product = data[idNum - 1]
        if (!product.sold) {
          res.json(product)
        } else {
          res.json()
        }

    } catch (e) {
        res.status(400).json( { message: e } )
    }


  } else {

    try {
      const data = await Product.find({}).limit(limitRecords)
      const products = [];
      for (let i = 0; i < data.length; i++) {
        if (!data[i].sold) {
          products.push(data[i])
        }
      }
      res.json(products.reverse())
    } catch (e) {
      res.status(400).json( { message: e } )
    }
  }
}

exports.getAllCategories = async (req, res) => {

  try {
    var categories = [];
    const data = await Product.find({})
    for (var i = 0; i < data.length; i++) {

      if (!(categories.includes(data[i]))) {
        categories.push(data[i].style)
      }

      res.json(categories)

    }
  } catch (e) {
    res.status(400).json( { message: e } )
  }

}

exports.getCategory = async (req, res) => {


  try {

    let { category } = req.query

    var products = []
    const data = await Product.find({})
    for (var i = 0; i < data.length; i++) {
      if (data[i].style == category && !data[i].sold) {
        products.push(data[i])
      }
    }

    res.json(products)

  } catch (e) {
    res.status(400).json( { message: e } )
  }


}


/*
 * /api/products
 * POST New Products
*/

exports.insertProduct = async (req, res) => {

  try {

    const data = await Product.find({})

    idVar = data.length + 1;

      const newProduct = new Product({
        id: idVar,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        artist: req.body.artist,
        year: req.body.year,
        dimensionX: req.body.dimensionX,
        dimensionY: req.body.dimensionY,
        medium: req.body.medium,
        style: req.body.style,
        condition: req.body.condition,
        seller: req.body.seller,
        image: req.body.image
      })

    await newProduct.save()
    res.json(newProduct)
    console.log("New Product: " + req.body.title + " Registered with ID " + idVar)
  } catch (e) {
    res.status(400).json( { message: e } )
  }

}
