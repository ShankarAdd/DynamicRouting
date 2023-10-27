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
  console.log(title);
  req.user
  .createProduct({
    title : title,
    price : price,
    imageUrl : imageUrl,
    description : description,
  })
  .then(result =>{
    // console.log(result);
    res.redirect('/admin/products')
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
  req.user
  .getProducts({where : {id : proId}})
  //Product.findByPk(proId)
  .then(products => {
    const product = products[0];
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }).catch(err=>console.log(err))
};

exports.postEditProduct = (req,res,next) =>{
  const proId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  Product.findByPk(proId)
  .then(product =>{
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDescription;
    return product.save();
  })
  .then(result =>{
    console.log('Upadted product')
    res.redirect('/admin/products')
  })
  .catch(err =>console.log(err));
}



exports.getProducts = (req, res, next) => {
  req.user
  .getProducts()
  .then(products =>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err));
};

exports.deleteProductById = (req,res,next) =>{
  const prod = req.params.productId;
  Product.findByPk(prod)
  .then(product =>{
    return product.destroy();
  })
  .then(result =>{
    res.redirect('/admin/products');
  })
  .catch(err =>console.log(err));
}