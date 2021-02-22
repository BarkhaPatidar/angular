const express = require('express');
const app = express();

const PORT = 3000;

const path = require('path');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const { Product } = require('./models/product');
const { User } = require('./models/user');
const { Cart } = require('./models/cart');
const { CartItem } = require('./models/cart-item');

const routes = require('./routes/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log("app error ", err);
    })
})

app.use('/', routes);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// sequelize.sync({ force: true })
sequelize.sync()
.then(result => {
    // console.log(result);
    return User.findByPk(5);
}).then(user => {
    if(!user) {
        return User.create({name: "Barkha12", email: "barkha12@newput.com"});
    }
    return user;
})
.then(user => {
    // console.log(user);
    if(!user) {
        return user.createCart();
    }
    return user;
})
.then(cart => {
    app.listen(PORT);
})
.catch(err => {
    console.log(err);
});