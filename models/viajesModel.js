const Sequelize = require('sequelize');
const connect = require('../connections/sequelizeConf').getConnection()

const Viajes = connect.define('viajes',{
    id:{
        type:Sequelize.STRING(45),
        primaryKey:true
    },
    viaje:{
        type:Sequelize.STRING(45)
    },
    active:{
        type:Sequelize.BOOLEAN
    },
    precio:{
        type:Sequelize.STRING(45),
        unique:true
    },
    descripcion:{
        type:Sequelize.STRING(250)
    },
    type:{
        type:Sequelize.BOOLEAN
    },
    img_path:Sequelize.STRING(45)
})

module.exports= Viajes