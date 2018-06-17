const MYSQL = require('mysql');
const CONN = MYSQL.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'web_viajes'
})

module.exports = CONN;
