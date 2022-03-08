const mysql = require('mysql')
/* --------------------------------------------------------------------------------------------------------- */
const cnx = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'biblio_impresiones'
    // database:'sakila'
})
/* --------------------------------------------------------------------------------------------------------- */
cnx.connect((error)=>{
    if(error){
        console.log('error en la conexion' + error)
        return
    }
    else{
        console.log('conectado')
    }
})
/* --------------------------------------------------------------------------------------------------------- */
module.exports = cnx;