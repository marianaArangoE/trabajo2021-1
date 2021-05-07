
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
        disponibilidad: true,
        estudiantes: []
    }
    let duplicado = listacursos.find(nom => nom.id == curso.id)
    if (!duplicado) {
        listacursos.push(cur)
        guardar()
    }
    else {
        throw new Error ("No pueden haber dos id iguales")
    }
}

const listarc = () => {
    try {
        listacursos = fs.readFileSync(datos + "/listacur.json")
        listacursos = JSON.parse(listacursos)
            .map(curso => ({
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
        throw new Error ("ya existe un estudiante con este nombre")
  
    }
}

const listaest = () => {
    try {
        listaestudiantes = fs.readFileSync(datos + "/listaest.json")
        listaestudiantes = JSON.parse(listaestudiantes)
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
        throw new Error("no hay ningun estudiante con este nombre")
    } else {
        listaestudiantes = nuevo
        guardarest()
    }
}


const buscar = (id) => {
    let lista = listarc()
    let encontrado = lista.find(curso => curso.id == id)
    let estudiantes = listaest()
    encontrado.estudiantes = encontrado.estudiantes.map(doc => {
        return estudiantes.find(estudiante => doc == estudiante.documento)
    })
    return encontrado

}
const matricular = (id, documento) => {
    let cursos = listarc()
    listacursos = cursos.map(curso => {
        if (curso.id == id) {
            if (!curso.estudiantes.find(estudiante => estudiante == documento)) {
                curso.estudiantes.push(documento)

            } else {
                throw new Error ("no existe un est con ese doc")

            }

        }
        return curso
    })
    guardar()
}
const eliminarest = (id, documento) => {
    let cursos = listarc()
    listacursos = cursos.map(curso => {
        if (curso.id == id) {
            curso.estudiantes = curso.estudiantes.filter(doc => doc != documento)

        }
        return curso
    })
    guardar()

}
module.exports = {
    crear,
    crearest,
    eliminar,
    listaest,
    listarc,
    buscar,
    matricular,
    eliminarest

}