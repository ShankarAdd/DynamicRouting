const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  //this will give true if query parameter presents if not it will be undefined which means false
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const proId=req.params.productId;
  Product.findById(proId,product =>{
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: editMode,
      product: product
    });
    
  });
};

exports.postEditProduct = (req,res,next) =>{
  const proId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(proId,updatedTitle,updatedPrice,updatedImageUrl,updatedDescription);
  updatedProduct.save();
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.deleteProductById = (req,res,next) =>{
  const prodId=req.body.productId;
  // const title = req.body.title;
  // const imageUrl = req.body.imageUrl;
  // const price = req.body.price;
  // const description = req.body.description;
  // const updatedProduct = new Product(prodId,title,imageUrl,price,description);
  Product.deleteProductById(prodId);
  res.redirect('/admin/products')
}