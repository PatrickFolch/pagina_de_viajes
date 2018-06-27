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

        registro(usuario, email, password, cb) {
            if (!conn) return cb("no se ha podidio crear la conexion");
            const SQL = `INSERT INTO clients (usuario, password, email) VALUES ('${usuario}','${password}','${email}');`;
            conn.query(SQL, (error) => {
                if (error) return cb(error);
                else return cb(rows)
            })

        }

    }


    module.exports = UserModel;