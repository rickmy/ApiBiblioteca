;
let config = require('../knexfile')
let env = 'development'
let db = require('knex')(config[env])
let bcrypt = require('bcrypt-nodejs')

/* estados  200 = ok 404 peticion no encontrarada y 500 edrror interno del servidor  */


let ingresarLector = (req, res) => {
    let campos = req.body.campos
    let tabla = 'usuarios'
    if(campos.clave != null){
        bcrypt.hash(campos.clave,null,null,function(error,hash){
            campos.clave = hash;
            console.log(campos)
            db(tabla).insert(campos)
            .then(resultado => {
                let user = campos.correo
                console.log(user.length)
                if(user.length>1){
                    db.select('id').from(tabla).where({correo:user})
                    .then(result=>{
                        console.log(result[0].id)
                        db('lectores').insert({'idUsuarios':result[0].id})
                        .then(resul=>{
                            return res.status(200).json({
                                mensaje: 'si valio'
                            })
                        })
                    
                    }
                    )}
                

            })
            .catch((error) => {
                return res.status(404).json({
                
                    mensaje: error 
                })
            })
        })
    }
    
}

let ingresarBibliotecario = (req, res) => {
    let campos = req.body.campos
    let tabla = 'usuarios'
    if(campos.clave != null){
        bcrypt.hash(campos.clave,null,null,function(error,hash){
            campos.clave = hash;
            console.log(campos)
            db(tabla).insert(campos)
            .then(resultado => {
                let user = campos.correo
                console.log(user.length)
                if(user.length>1){
                    db.select('id').from(tabla).where({correo:user})
                    .then(result=>{
                        console.log(result[0].id)
                        db('bibliotecarios').insert({'idUsuarios':result[0].id})
                        .then(resul=>{
                            return res.status(200).json({
                                mensaje: 'si valio'
                            })
                        })
                    
                    }
                    )}
                

            })
            .catch((error) => {
                return res.status(404).json({
                
                    mensaje: error 
                })
            })
        })
    }
    
}


const loginLector = async(req, res)=>{
    const campos = ['correo','clave']
    const tabla = 'usuarios'
    let mail = req.body.correo    
    let clave = req.body.clave

   // console.log(campos)
    db.select('id').from(tabla).where({correo:mail})
    .then(resultado=>{
        //console.log(resultado[0].id )
        db('lectores').where({idUsuarios:resultado[0].id})
        .then(result=>{
            //console.log(result.length)
            if(result.length == 1){
                db(tabla).where({correo: mail}).select(campos) 
    //db.select(campos).from(tabla)
    .then(resultado =>{
        //console.log(resultado)
        if (resultado.length == 1) {
            let claveDb = resultado[0].clave
            bcrypt.compare(clave, claveDb, function (error, result){
                if (result) {
                    return res.status(200).json({
                        result,
                        ok: true,
                        mensaje: 'Login success'
                    })
                }
                else {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Login fail'
                    })
                }
            })  
        } else {
            return res.status(404).json({
                ok: false,
                mensaje: 'Login fail'
            })
        }            
            })   

            .catch((error) => {
                return res.status(500).json({
                    ok: false,
                    datos: null,
                    mensaje: `Error del servidor: ${error}` 
                })
            })
            }else{
                return res.status(404).json({
                    ok:false,
                    mensaje: 'no es lector'
                })
            }
        })
        .catch((error) => { 
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `no es lector` 
            })
        })
    })
    .catch((error) => { 
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `no es usuario` 
        })
    })
        
}

const loginBibliotecario = async(req, res)=>{
    const campos = ['correo','clave']
    const tabla = 'usuarios'
    let mail = req.body.correo    //el que ingrsa el usuario
    let clave = req.body.clave  // que ingresa el usuario

   // console.log(campos)
    db.select('id').from(tabla).where({correo:mail})
    .then(resultado=>{
        //console.log(resultado[0].id )
        db('bibliotecarios').where({idUsuarios:resultado[0].id})
        .then(result=>{
            //console.log(result.length)
            if(result.length == 1){
                db(tabla).where({correo: mail}).select(campos) 
    //db.select(campos).from(tabla)
    .then(resultado =>{
        //console.log(resultado)
        if (resultado.length == 1) {
            let claveDb = resultado[0].clave
            bcrypt.compare(clave, claveDb, function (error, result){
                if (result) {
                    return res.status(200).json({
                        result,
                        ok: true,
                        mensaje: 'Login success'
                    })
                }
                else {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Login fail'
                    })
                }
            })  
        } else {
            return res.status(404).json({
                ok: false,
                mensaje: 'Login fail'
            })
        }            
            })   

            .catch((error) => {
                return res.status(500).json({
                    ok: false,
                    datos: null,
                    mensaje: `Error del servidor: ${error}` 
                })
            })
            }else{
                return res.status(404).json({
                    ok:false,
                    mensaje: 'no es bibliotecario'
                })
            }
        })
        .catch((error) => { 
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `no es bibliotecario` 
            })
        })
    })
    .catch((error) => { 
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `no es usuario` 
        })
    })
        
}


verificarCorreo =(req,res)=>{
    const mail = req.body.correo
    console.log(mail)
    db.select('id').from('usuarios').where({correo:mail})
    .then(resultado =>{
        console.log(resultado)
        
        if(resultado.length == 1){
            return res.status(200).json({
                ok:true
            })
        } else {
            return res.status(404).json({
                ok: false
            })
        }
        
    })
    .catch((error) => { 
        return res.status(404).json({
            ok: false
        })
    })
}

recuperarUno= (req,res) =>{
    const campos = req.body.campos
    const tabla = 'preguntasUsuarios'
    let mail = campos.correo

    db.select('id').from('usuarios').where({correo:mail})
    .then(resultado =>{
        let idDb = resultado[0].id
        db.select(['idPreguntas','respuestas']).from(tabla).where({'idUsuario':idDb})
        .then(result=>{

            if(result[0].idPreguntas === campos.idPreguntaUno && result[0].respuestas === campos.respuestaUno
                && result[2].idPreguntas === campos.idPreguntaTres && result[2].respuestas === campos.respuestaTres
                && result[4].idPreguntas === campos.idPreguntaCinco && result[4].respuestas === campos.respuestaCinco){
                    
                    return res.status(200).json({
                        ok:true
                    })
            } else {
                
                return res.status(500).json({
                    error
                })
            }
            
        })

        .catch((error) => { 
            return res.status(404).json({
                ok: false
            })
        })

    })
}

recuperarDos= (req,res) =>{
    const campos = req.body.campos
    const tabla = 'preguntasUsuarios'
    let mail = campos.correo

    db.select('id').from('usuarios').where({correo:mail})
    .then(resultado =>{
        let idDb = resultado[0].id
        db.select(['idPreguntas','respuestas']).from(tabla).where({'idUsuario':idDb})
        .then(result=>{

            if(result[0].idPreguntas === campos.idPreguntaUno && result[0].respuestas === campos.respuestaUno
                && result[1].idPreguntas === campos.idPreguntaDos && result[1].respuestas === campos.respuestaDos
                && result[3].idPreguntas === campos.idPreguntaCuatro && result[3].respuestas === campos.respuestaCuatro){
                    return res.status(200).json({
                        ok:true
                    })
            } else {
                return res.status(500).json({
                    error
                })
            }
            
        })

        .catch((error) => { 
            return res.status(404).json({
                ok: false
            })
        })

    })
}



module.exports = {
    ingresarLector,
    ingresarBibliotecario,
    loginLector,
    loginBibliotecario,
    verificarCorreo,
    recuperarUno,
    recuperarDos
}
