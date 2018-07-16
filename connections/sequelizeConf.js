const Sequelize= require('sequelize')

class SequelizeConf{
    static getConnection(){
        return new Sequelize('web_viajes','root','',{
            host:'127.0.0.1',
            dialect:'mysql',
            pool:{
                max:5,
                min:0,
                idle:10000
            }
        })
    }
}

module.exports=SequelizeConf