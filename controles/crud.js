;
let config = require('../knexfile')
let env = 'development'
let db = require('knex')(config[env])
let bcrypt = require('bcrypt-nodejs')

/* estados  200 = ok 404 peticion no encontrarada y 500 edrror interno del servidor  */

function prueba(req,res) {
    res.status(200).send({message: "hola que hace"})
}


let leerDatos = (req, res) => {
    let campos = req.body.campos
    let tabla = req.body.tabla
    console.log(campos)
    console.log(tabla)
    db.select(campos).from(tabla)
    .then(registros =>{
        return res.status(200).json(
             registros
        )
    })
    .catch(error => {
        return res.status(404).json({
            datos: error        })
    })
}


let ingresarDatos = (req, res) => {
    let campos = req.body.campos //ingresados dentro de un objeto
    let tabla = req.body.tabla 
    console.log(campos)
    console.log(tabla)
    db(tabla).insert(campos)
    .then(resultado => {
        return res.status(200).json({
            ok: true,
            mensaje: "el registro fue guardado correctamente "
        })
    })
    .catch((error) => {
        return res.status(404).json({
            
            mensaje: error 
        })
    })
}

//falta explicacion

let cambioClave = (req, res) => {
    let tabla = req.body.tabla
    let campos = req.body.campos
    console.log(campos)
    let mail = campos[0].correo
    console.log(mail)
    let clave = campos[0].clave
    console.log(clave)

    db(tabla).select('id').where({correo:mail})
    .then(resultado=>{
        console.log(resultado[0].id)
        let id = resultado[0].id
        bcrypt.hash(clave,null,null,function(error,hash){
            claveEncriptada = hash;
            console.log(claveEncriptada)
            db(tabla).where('id', id).update({clave : claveEncriptada})
            .then( resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado,
                mensaje :' valio'
                })
            })
            .catch((error) => {
                return res.status(500).json({
                    ok: false,
                    datos: null,
                    mensaje: `Error del servidor: ${error}`,
                    mensaje:'ya valio madres'
                })
            })
        })
    })


}

const putData = (req,res) =>{
    const tabla = req.body.tabla
    let campos = req.body.campos
    let idIng = campos.id
    console.log(campos.idIng)

    db(tabla).where('id', idIng).update(campos)
            .then( resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado
                })
            })
            .catch((error) => {
                return res.status(500).json({
                    ok: false,
                    datos: null,
                    mensaje: `Error del servidor: ${error}`,
                    mensaje:'ya valio madres'
                })
            })
}

const deleteLogic =(req,res)=> {
    var tabla = req.body.tabla
    var id = req.body.id

    db(tabla).where('id',id).update({estado:false})
    .then( resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado
        })
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
    
}

let deleteDatos = (req, res) => {
    let tabla = req.body.tabla
    let id = req.body.id
    db(tabla).where('id', id).delete()
    .then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado
        }) 
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}` 
        })
    })
}



let leerTablaId = (req, res) => {
    let campos = req.body.campos
    let tabla = req.body.tabla
    let condicion = req.body.condicion
    db(tabla).where(condicion).select(campos)
    .then(registros => {
        return res.status(200).json({
            campos: registros
        })
    })
    .catch(error => {
        return res.status(404).json({
            campos: error
        })
    })      
}

module.exports = {
    leerDatos,
    ingresarDatos,
    cambioClave,
    deleteDatos,
    prueba,
    leerTablaId,
    deleteLogic,
    putData
}
