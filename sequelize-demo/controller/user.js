const { Product } = require('../models/product');
const { User } = require('../models/user');
const { Cart } = require('../models/cart');
const { Op } = require('sequelize');

exports.index = async (req, res) => {
    const proId = req.query.id;

    const { count, rows } = await Product.findAndCountAll({
        where: {
          title: {
            [Op.like]: 'Boo%'
          }
        },
        limit: 2
    });
    console.log(count);
    console.log(rows);
    
    req.user.getProducts({where: {id: proId}}).then(product => {
        console.log(product);
    })

    // Product.findAll().then(result => {
    Product.findAll({where: {id: proId}}).then(result => {
    // Product.findByPk(proId).then(result => {
        res.send(result);
    }).catch(err => {
        console.log(err);
    });
    // User.findAll({include: Cart}).then(users => {
    //     res.send(users);
    // })
}

exports.addProduct = (req, res) => {
    console.log(req.body);
    const title = req.body.title;
    const price = req.body.price;
    Product.create({
        title: title,
        price: price,
        userUserId: req.user.user_id
    }).then(success => {
        res.send(success);
    }).catch(err => {
        res.send(" "+err+" ");
    });
}

exports.updateProduct = (req, res) => {
    const proId = req.body.id;
    const title = req.body.title;
    const price = req.body.price;
    Product.update({
        title: title,
        price: price
    }, {
        where: {
          id: proId
        }
    }).then(success => {
        res.send(success);
    }).catch(err => {
        console.log(err);
    });
}

exports.deleteProduct = (req, res) => {
    const proId = req.body.id;
    const title = req.body.title;
    const price = req.body.price;
    Product.destroy({
        where: {
          id: proId
        }
    }).then(success => {
        res.json(success);
    }).catch(err => {
        console.log(err);
    });
}

exports.getCart = (req, res) => {
    req.user.getCart().then(cart => {
        return cart.getProducts().then(products => {
            res.send(products);
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    let fetchCart;
    let newQuantity = 1;
    req.user.getCart().then(cart => {
        fetchCart = cart;
        return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
        let product;
        if(products.length > 0) {
            product = products[0];
        }
        if(product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
        }
        return Product.findByPk(prodId).then(product => {
            return fetchCart.addProduct(product, { through: { quantity: newQuantity } });
        }).catch(err => {
            console.log(err);
        })
    }).then(() => {
        res.send("Added to cart");
    })
    .catch(err => {
        console.log(err);
    })
}