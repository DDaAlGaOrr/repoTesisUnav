const express = require('express')
const app = express()
const port = 3000
const cnx = require('./dbConection')
const session = require('express-session')
// const bcript = require('bcrypt')
const md5 = require('blueimp-md5')
const { off } = require('./dbConection')
/* --------------------------------------------------------------------------------------------------------- */
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))
//configuracion de archivos estaticos 
app.use(express.static('public'));
/* --------------------------------------------------------------------------------------------------------- */
// Page login
app.get('/login',(req,res)=>{
    res.render('pages/login.ejs')
})
// modulo login
app.post('/login',(req,res)=>{
    let username = req.body.username
    let password = req.body.password
    let passMd5 = md5(password)
    cnx.query(`select * from login where nombre = ? and contrasena = ?`,[username,passMd5],(err,results)=>{
        // console.log(results)
        if(results.length == 0){
            console.log('Usuario o contraseña incorrectos')
        }
        else{
            req.session.name = results[0].nombre
            req.session.logged = true
            res.redirect('/')
        }
    })
})
/* --------------------------------------------------------------------------------------------------------- */
//page home
app.get('/', (req,res)=>{
    // if(req.session.logged){
        const selectSchool = req.query.selectSchool
        const selectPage = req.query.pageSelect
        console.log(selectSchool)
        console.log(selectPage)
        const limit = 5
        let page = req.query.pageSelect
        if(page == undefined){
            page = 1
        }
        const offset = (page-1) * limit
        cnx.query(`select distinct SQL_CALC_FOUND_ROWS * from imagenes where imagenes.tipo_escuela like '%${selectSchool}%' LIMIT ${offset}, ${limit}`,(err,results,fields)=>{
                  
            if(err){
                console.log(err)
            }
            cnx.query('SELECT FOUND_ROWS() as total',(err,result,fields)=>{
                if(err){
                    console.log(err)
                }
                let totalPaginas = Math.ceil(result[0].total/limit)
                let jsonResult = {
                    'tesisPageCount': results.length,
                    'pageNumber':page,
                    'tesis':results,
                    'totalPaginas':totalPaginas
                }
                let json = JSON.parse(JSON.stringify(jsonResult))
                // console.log(`tesis por pagina: ${limit}`)
                // console.log(offset)
                // console.log(json)
                 res.render('pages/index', {
                     login: true,
                     name: req.session.name,
                     data:jsonResult,
                     schoolSelect: selectSchool,
                     pageSelect:selectPage
                 })
            })
        })  
    // }else{
    //      res.redirect('/login')
    // } 
})
/* --------------------------------------------------------------------------------------------------------- */
//config server
app.listen(port,() =>{
    console.log(`server on port ${port}`)
})
/* --------------------------------------------------------------------------------------------------------- */


