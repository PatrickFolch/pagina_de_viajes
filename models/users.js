let conn = require('../connections/mysqlconnections');

class UserModel {
    
     //Recuperar todos los usuarios
    getAll() {
        return new Promise((resolve, reject) => {
            if (!conn) return reject("No se ha podido crea la conexion");
            const SQL = "SELECT * FROM clients;";
            conn.query(SQL, (error, rows) => {
                if (error) return reject(error);
                else return resolve(rows);
            })
        })

    }

        findUser(usuario){
            return new Promise((resolve, reject) => {
                if (!conn) return reject("No se ha podidio crear la conexion");
                const SQL = `SELECT * FROM clients WHERE usuario ='${usuario}';`;
                conn.query(SQL, (error, rows) => {
                    if (error) return reject(error);
                    else return resolve(rows);

                })
            })
        }

        getUserByEmailOrUsername( email,usuario) 
        {
            return new Promise((resolve, reject)=>{
                if (!conn) return reject("no se ha podidio crear la conexion");
                const SQL = `SELECT * FROM clients where usuario ='${usuario}' or email='${email}';`
                conn.query(SQL, (error, rows) => {
                    if (error) return reject(error);
                    else return resolve(rows)

            })    
            })

        };
        insertUser(data){
            return new Promise((resolve, reject)=>{
                if(!conn) return reject("No existe conexion");
                let SQL = `INSERT INTO clients (usuario,email,password,hash) values ('${data.usuario}','${data.email}','${data.password}','${data.hash}');`;
                conn.query(SQL,(error, rows)=>{
                    if(error) return reject(error);
                    else return resolve(rows)
                })
            })
        }
    }


    module.exports = UserModel;