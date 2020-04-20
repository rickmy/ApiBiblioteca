let config = require('../knexfile')
let env = 'development'
let db = require('knex')(config[env])

let mostrarHistorial = (req, res) =>{
    const tabla = 'prestamos'
    const campos = ['prestamos.codigo','fechaPrestamo','observaciones','fechaMaxEntrega','primerNombre','titulo','usuarios.correo']
    let mail = req.body.correo
    db(tabla).select(campos).innerJoin('lectores','prestamos.idLectores','lectores.id').
    innerJoin('usuarios','lectores.idUsuarios','usuarios.id').
    innerJoin('detallePrestamos','detallePrestamos.idPrestamos','prestamos.id').
    innerJoin('ejemplares','ejemplares.id','detallePrestamos.idEjemplares').
    innerJoin('textos','textos.id','ejemplares.idTextos')
    .where('usuarios.correo','=', mail)
        .then(respo =>{ 
            console.log(respo)
            return res.status(202).json({
            respo,
            ok:true}                                                              
            )
        })
        .catch(error=>{
            return res.status(500).json({
                error,
                ok: false,
                
            })
        })

}

module.exports = {
    mostrarHistorial

}