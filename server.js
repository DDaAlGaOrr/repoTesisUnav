const express = require('express')
const app = express()
const port = 3000
const cnx = require('./dbConection')
const session = require('express-session')
/* --------------------------------------------------------------------------------------------------------- */
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))
// app.use('/resources',express.static('public'))
// app.use('/resources',express.static(__dirname+'/public'))
/* --------------------------------------------------------------------------------------------------------- */
// Page login
app.get('/login',(req,res)=>{
    res.render('login.ejs')
})
//page home
app.get('/', (req,res)=>{
    res.render('index.ejs',{nombre:'Daniel'})
})
/* --------------------------------------------------------------------------------------------------------- */
//config server
app.listen(port,() =>{
    console.log(`server on port ${port}`)
})
/* --------------------------------------------------------------------------------------------------------- */


