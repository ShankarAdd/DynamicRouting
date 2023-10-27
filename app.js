const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

var cors = require('cors');

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');
const expenseRoute = require('./routes/expense')

const Product = require('./models/product');
const User = require('./models/user');


//Changing from urlencoded to json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) =>{
    User.findByPk(1)
    .then(user =>{
        req.user = user;
        next();
    })
    .catch(err =>console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use('/user',userRoutes);
app.use('/expense',expenseRoute)

app.use(errorController.get404);

Product.belongsTo(User,{constraints : true, onDelete : 'CASCADE'});
User.hasMany(Product);

sequelize
// .sync({force : true})
.sync()
.then(res =>{
    return User.findByPk(1);
})
.then(user =>{
    if(!user){
        return User.create({userName : 'Shankar',userEmail: 'testing@gmail.com'});
    }
    return user;
})
.then(user =>{
    // console.log(user);
    app.listen(3000);
})
.catch(err =>{
    console.log(err);
})

