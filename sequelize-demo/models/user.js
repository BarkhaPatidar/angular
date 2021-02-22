const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define( 'user', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
}, {
    indexes: [
        // Create a unique index on email
        {
            unique: true,
            fields: ['email']
        }
    ]
    
});

module.exports = { User };