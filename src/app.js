const express = require('express')
const hbs = require("express-hbs")
const path = require("path")
const body = require("body-parser")
const bodyParser = require('body-parser')
const funciones = require("./helpers/index")
const app = express()

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
    funciones.crear(req.body)
    res.render("crearcurso", {
      curso:{nombre: " "}
    })
})
app.post("/crearest", (req, res) => {
    funciones.crearest(req.body)
    res.render("inscribir", {
        nombreEst: req.body.nombreEst,
        correo: req.body.correo,
        telefono: parseInt(req.body.telefono),
        doc: parseInt(req.body.doc),

    })
})
app.get("/detallecurso/:id", (req, res) => {
    const curso = funciones.buscar(req.params.id)
    console.log(req.params.id)
    res.render("detallecurso", {
        curso
    })
})
app.get("/eliminar/:doc",(req,res)=>{
    funciones.eliminar(req.params.doc)
    console.log(req.params.doc)

    res.redirect("/verinscritos")
})
const port = process.env.PORT || 3000
