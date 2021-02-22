const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        validate: {
            len: [4, 6]
        }
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
            isEven(value) {
                if (parseInt(value) % 2 !== 0) {
                  throw new Error('Only even values are allowed!');
                }
            }
        }
    }
});

module.exports = { Product };