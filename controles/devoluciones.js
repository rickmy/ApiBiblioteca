;
let config = require('../knexfile')
let env = 'development'
let db = require('knex')(config[env])

getDevoluciones=(req,res)=>{
    const tabla = 'devoluciones'
    const campos = ['devoluciones.codigo','fechaDevolucion','devoluciones.observaciones','usuarios.primerNombre','usuarios.primerApellido','prestamos.codigo']
    db(tabla).select(campos).innerJoin('bibliotecarios','devoluciones.idBibliotecario','bibliotecarios.id')
    .innerJoin('prestamos','devoluciones.idPrestamos','prestamos.id')
    .innerJoin('usuarios','usuarios.id','bibliotecarios.idUsuarios')
    .then(
        registro=>{
            return res.status(200).json(
                 registro
            )
        }
    )
}
let agregarDevoluciones = (req, res) => {
    const tabla='devoluciones'
    let campos = req.body.campos
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

let leerPrestamos = (req, res) =>{
    const tabla = 'prestamos'
    const campos = ['codigo', 'id']
    db(tabla).select(campos).then(resgitro =>{
        return res.status(200).json(
            data = resgitro
        )
    })
    .catch(error=>{
        return res.status(500).json({
            error,
            ok: false
        })
    })
}

module.exports={
  getDevoluciones,  
  agregarDevoluciones,
  leerPrestamos
}