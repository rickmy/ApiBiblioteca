;
let config = require('../knexfile')
let env = 'development'
let db = require('knex')(config[env])
let fs = require('fs')
let path = require('path')


let subirImagen =async (req, res) => {
    let files = req.files.upload
    let url = files.path
    console.log(url)
    urlImg = url.split('\\')
    console.log('---------------')
    console.log(urlImg[1])

    await db('imagenes').insert({
        url: urlImg[1]
    }).then(registros =>{
        return res.status(200).json({
            ok: true,
            mensaje: 'imagen guardada'
        })
    }).catch(error =>{
       
        return res.status(500).json({
            ok: false,
            error
        })
    })
    
}

module.exports ={
subirImagen


}