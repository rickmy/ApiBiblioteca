;
let config = require('../knexfile')
let env = 'development'
let db = require('knex')(config[env])

let leerpreguntas = (req, res) => {
   
    db.select('preguntaSeguridad').from('preguntasSeguridad')
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

let ingresarRespuestas = (req,res)=>{
    let tablaUsuario ='usuarios'
    let tabla = 'preguntasUsuarios'
    let campos = req.body.campos
    console.log(campos)
    let mail = campos.idUsuario
    let preguntas = campos.idPreguntas
    let respuesta = campos.respuestas

    db.select('id').from(tablaUsuario).where({correo:mail})
    .then(resultado => {
        console.log(resultado)
        if(resultado[0].id > 0){
            db(tabla).insert({'idUsuario':resultado[0].id,'idPreguntas':preguntas,'respuestas':respuesta})
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                mensaje: "el registro fue guardado correctamente "
            })
        })
        .catch((error) => {
            return res.status(404).json({
            
                mensaje: 'aqui es la ingresada'
            })
        })}
        
    })
    .catch((error) => {
        return res.status(404).json({
        
            mensaje: 'a qui si es 1'
        })
    })
    
}

module.exports={
    leerpreguntas,
    ingresarRespuestas
}