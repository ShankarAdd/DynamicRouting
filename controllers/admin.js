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
  product
  .save()
  .then(() =>{
    res.redirect('/');
  })
  .catch(err =>console.log(err));
};
exports.getEditProduct = (req, res, next) => {
  //this will give true if query parameter presents if not it will be undefined which means false
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const proId=req.params.productId;
  Product.findById(proId).then(([rows,fieldData])=>{
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:editMode,
      product:rows[0]
    });
  }).catch(err=>console.log(err))
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
  const prod = req.params.productId;
  Product.deleteProduct(prod);
  res.redirect('/products');
}