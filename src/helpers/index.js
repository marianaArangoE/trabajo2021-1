
const fs = require("fs")
const path = require("path")
const datos = path.join(__dirname, "../datos")

listacursos = []
const crear = (curso) => {
    let cur = {
        nombre: curso.nombre,
        descripcion: curso.descripcion,
        id: curso.id,
        modalidad: curso.modalidad,
        valor: curso.valor,
        intensidadHoraria: curso.intensidadHoraria,
        disponibilidad : true
    }
    let duplicado = listacursos.find(nom => nom.id == curso.id)
    if (!duplicado) {
        listacursos.push(cur)
        guardar()
    }
    else {
        console.log("ya existe un curso con este nombre")
    }
}

const listarc = () => {
    try {
        listacursos = fs.readFileSync(datos + "/listacur.json")
        listacursos = JSON.parse(listacursos)
        .map(curso=>({
            ...curso,
            disponibilidad: curso.disponibilidad ? "disponible" : "no disponible"
        }))
        
    }
  
    catch (err) {
        listacursos = []
    }
    return listacursos 
}


const guardar = () => {
    let datoscur = JSON.stringify(listacursos)
    fs.writeFile(datos + "/listacur.json", datoscur, (err) => {
        if (err) throw (err)
        console.log("Lista creada")
    })
}
//para estudiante
listaestudiantes = []
const crearest = (estudiante) => {
    let est = {
        nombreEst: estudiante.nombreEst,
        correo: estudiante.correo,
        documento: estudiante.doc,
        telefono: estudiante.tel,

    }
    let duplicado = listaestudiantes.find(nom => nom.nombreEst == estudiante.nombreEst)
    if (!duplicado) {
        listaestudiantes.push(est)
        guardarest()
    }
    else {
        console.log("ya existe un estudiante con este nombre")
    }
}

const listaest = () => {
    try {
        listaestudiantes = require(datos + "/listaest.json")
    }
    catch (err) {
        listaestudiantes = []
    }
    return listaestudiantes
}


const guardarest = () => {
    let datosest = JSON.stringify(listaestudiantes)
    fs.writeFile(datos + "/listaest.json", datosest, (err) => {
        if (err) throw (err)
        console.log("Lista creada de estudiante")
    })
}
const eliminar = (doc) => {
    listaest()
    let nuevo = listaestudiantes.filter(est => est.documento != doc)
    if (nuevo.length == listaestudiantes.length) {
        console.log("no hay ningun estudiante con este nombre")
    } else {
        listaestudiantes = nuevo
        guardarest()
    }
}


const buscar = (id) =>{
    let lista= listarc()
   let encontrado = lista.find(curso => curso.id == id)
   return encontrado
    
} 
module.exports = {
    crear,
    crearest,
    eliminar,
    listaest,
    listarc,
    buscar

}