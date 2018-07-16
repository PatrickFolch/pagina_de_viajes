const Sequelize = require('sequelize');
const connect = require('../connections/sequelizeConf').getConnection()

const User = connect.define('clients',{
    usuario:{
        type:Sequelize.STRING(45),
        unique:true
    },
    password:{
        type:Sequelize.STRING(250)
    },
    email:{
        type:Sequelize.STRING(45),
        unique:true
    },
    hash:{
        type:Sequelize.STRING(250)
    },
    active:{
        type:Sequelize.BOOLEAN
    }
})

module.exports=User