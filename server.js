const express = require('express')
const app = express()
const port = 3000
const cnx = require('./dbConection')
const session = require('express-session')
// const bcript = require('bcrypt')
const md5 = require('blueimp-md5')
/* --------------------------------------------------------------------------------------------------------- */
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))
app.use(express.static('public'));
// app.use("/css/", express.static(__dirname  + "public/css/"));
// app.use("/image/", express.static(__dirname  + "public/image/"));
/* --------------------------------------------------------------------------------------------------------- */
// Page login
app.get('/login',(req,res)=>{
    res.render('pages/login.ejs')
})
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
    if(req.session.logged){
        res.render('pages/index',{
            login:true,
            name:req.session.name
        })
        
    }else{
         res.redirect('/login')
    } 
})
/* --------------------------------------------------------------------------------------------------------- */
//config server
app.listen(port,() =>{
    console.log(`server on port ${port}`)
})
/* --------------------------------------------------------------------------------------------------------- */


