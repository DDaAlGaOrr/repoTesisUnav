const mysql = require('mysql')
/* --------------------------------------------------------------------------------------------------------- */
const cnx = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mydb'
    // database:'sakila'
})
/* --------------------------------------------------------------------------------------------------------- */
cnx.connect((error)=>{
    if(error){
        console.log('error en la conexion')
        return
    }
    else{
        console.log('conectado')
    }
})
/* --------------------------------------------------------------------------------------------------------- */
module.exports = cnx;