let conn = require('../connections/mysqlconnections');

class UserModel
{
    getAll(cb){
        if(!conn) return cb("No se ha podido crea la conexion");
        const SQL ="SELECT * FROM clients;";
        conn.query(SQL,(error,rows)=>{
            if(error)return cb(error);
            else return cb(rows);
        })
    }

    findUser(usuario, cb){
        if(!conn) return cb("No se ha podidio crear la conexion");
        const SQL ="SELECT * FROM clients WHERE usuario LIKE '%"+usuario+"%';";
        conn.query(SQL,(error, rows)=>{
            if(error) return cb(error);
            else return cb(rows);
        })
    }

    registro(usuario, email, password,cb){
        if(!conn) return cb("no se ha podidio crear la conexion");
        const SQL=`INSERT INTO clients (usuario, password, email) VALUES ('${usuario}','${password}','${email}');`;
        conn.query(SQL,(error)=>{
            if(error) return cb(error);
            else return cb(rows)
        })

    }

}


module.exports =UserModel;