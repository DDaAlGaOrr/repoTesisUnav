const mysql = require('mysql')
/* --------------------------------------------------------------------------------------------------------- */
const cnx = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    // database:'biblio_impresiones'
    database:'biblio_tesis'
    // database:'sakila'
})
/* --------------------------------------------------------------------------------------------------------- */
cnx.connect((error)=>{
    if(error){
        console.log('error en la conexion biblio_impresiones' + error)
        return
    }
    else{
        console.log('conectado biblio_impresiones')
    }
})
/* --------------------------------------------------------------------------------------------------------- */
module.exports = cnx;