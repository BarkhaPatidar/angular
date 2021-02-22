const Sequelize = require('sequelize');

const sequelize = new Sequelize('first', 'root', 'Root123!', { 
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;