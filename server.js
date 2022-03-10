const express = require('express')
const app = express()
const port = 3000
const cnx = require('./dbConection')
const session = require('express-session')
const fs = require('fs')
// const bcript = require('bcrypt')
const md5 = require('blueimp-md5')
const {
    off
} = require('./dbConection')
/* --------------------------------------------------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
//configuracion de archivos estaticos 
app.use(express.static('public'));
/* --------------------------------------------------------------------------------------------------------- */
// Page login
app.get('/login', (req, res) => {
    res.render('pages/login.ejs')
})
// modulo login
app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let passMd5 = md5(password)
    cnx.query(`select * from login where nombre = ? and contrasena = ?`, [username, passMd5], (err, results) => {
        // console.log(results)
        if (results.length == 0) {
            console.log('Usuario o contraseña incorrectos')
        } else {
            req.session.name = results[0].nombre
            req.session.logged = true
            res.redirect('/')
        }
    })
})
/* --------------------------------------------------------------------------------------------------------- */
//page home
app.get('/', (req, res) => {
    let selectSchool = req.query.selectSchool
    let selectPage = req.query.pageSelect
    const limit = 5
    if (selectPage == undefined) {
        selectPage = 1
    }
    if (selectSchool == undefined) {
        selectSchool = ""
    }
    console.log(selectPage)
    console.log(selectSchool)
    const offset = (selectPage - 1) * limit
    cnx.query(`select distinct SQL_CALC_FOUND_ROWS * from imagenes where imagenes.tipo_escuela like '%${selectSchool}%' LIMIT ${offset}, ${limit}`, (err, results, fields) => {
        if (err) {
            console.log(err)
        }
        cnx.query('SELECT FOUND_ROWS() as total', (err, result, fields) => {
            if (err) {
                console.log(err)
            }
            let totalPaginas = Math.ceil(result[0].total / limit)
            let data = {
                'tesisPageCount': results.length,
                'pageNumber': selectPage,
                'tesis': results,
                'totalPaginas': totalPaginas
            }
            res.render('pages/index', {
                data: data,
                schoolSelect: selectSchool,
                pageSelect: selectPage
            })
        })
    })
})
/* --------------------------------------------------------------------------------------------------------- */
app.get('/upload',(req,res)=>{
    res.render('pages/upload')
})
app.post('/upload',(req,res)=>{
    const schoolName = req.body.schoolName
    const file = req.body.file
    const description = req.body.description
    console.log(schoolName)
})
/* --------------------------------------------------------------------------------------------------------- */
//config server
app.listen(port, () => {
    console.log(`server on port ${port}`)
})
/* --------------------------------------------------------------------------------------------------------- */