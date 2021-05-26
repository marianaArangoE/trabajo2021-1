const express = require('express')
const hbs = require("express-hbs")
const path = require("path")
const body = require("body-parser")
const bodyParser = require('body-parser')
const funciones = require("./helpers/index")
const app = express()
const mongoose = require('mongoose')
require('./config');
app.use(express.static("public"))
app.engine("hbs", hbs.express4({
    partialsDir: path.join(__dirname, "../template/patrials")
}))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../template/view"))
app.use(bodyParser.urlencoded({ extended: false }))

//rutas
app.get('/', function (req, res) {
    res.render('index', {
        titulo: "home"
    }
    )
})
app.get("/crearcurso", function (req, res) {

    res.render("crearcurso", {
        titulo: "Crear curso"
    })
})
app.get("/vercursos", function (req, res) {
    const lista = funciones.listarc()
    console.log(lista)
    res.render("vercursos", {
        titulo: "Ver cursos",
        listarc: lista
    })
})
app.get("/inscribir", function (req, res) {

    res.render("inscribir", {
        titulo: "Inscribir",
        cursos: funciones.listarc()

    })
})
app.get("/verinscritos", function (req, res) {
    const estudiantesL = funciones.listaest()
    console.log(estudiantesL)
    res.render("verinscritos", {
        titulo: "Ver inscritos",
        listaest: estudiantesL
    })
})
app.post("/crearcurso", (req, res) => {
    let mensajeError
    try {
        funciones.crear(req.body)
    }
    catch (error) {
        mensajeError = error.message
    }
    res.render("crearcurso", {
        curso: { nombre: " " },
        mensajeError
    })
})
app.post("/crearest", (req, res) => {
    let mensajeError
    try {
        funciones.crearest(req.body)
    }
    catch (error) {
        mensajeError = error.message

    }
    res.render("inscribir", {
        nombreEst: req.body.nombreEst,
        correo: req.body.correo,
        telefono: parseInt(req.body.telefono),
        doc: parseInt(req.body.doc),
        mensajeError


    })
})
app.get("/detallecurso/:id", (req, res) => {
    const curso = funciones.buscar(req.params.id)
    console.log(req.params.id)
    res.render("detallecurso", {
        curso,
        estudiantes: funciones.listaest()
    })
})
app.get("/cerrar/:id", (req, res) => {


    res.render("detallecurso",)
})

app.get("/eliminar/:doc", (req, res) => {
    funciones.eliminar(req.params.doc)
    console.log(req.params.doc)
    res.redirect("/verinscritos")
})

app.post("/matricular/:id", (req, res) => {
    funciones.matricular(req.params.id, req.body.estudiante)
    console.log(req.body)
    res.redirect("/detallecurso/" + req.params.id)
})
app.get("/expulsar/:id/:doc", (req, res) => {
    funciones.eliminarest(req.params.id, req.params.doc)
    console.log(req.body)
    res.redirect("/detallecurso/" + req.params.id)

})
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, resultado) => {
    if (err) {
        console.log("error al conectar")
    }
    console.log(" se ha conectado a la base de datos")
});


app.listen(process.env.PORT, () => {
    console.log('Servidor en el puerto' + process.env.PORT)
})

module.exports = app