let config = require('../knexfile')
let env = 'development'
let db = require('knex')(config[env])


let consultarPrestamos = (req, res)=>{
    const tabla = 'prestamos'
    const campos = ['prestamos.codigo','fechaPrestamo','observaciones','fechaMaxEntrega','primerNombre','titulo']
    db(tabla).select(campos).innerJoin('bibliotecarios','prestamos.idBibliotecario','bibliotecarios.id').
    innerJoin('usuarios','bibliotecarios.idUsuarios','usuarios.id').
    innerJoin('detallePrestamos','detallePrestamos.idPrestamos','prestamos.id').
    innerJoin('ejemplares','ejemplares.id','detallePrestamos.idEjemplares').
    innerJoin('textos','textos.id','ejemplares.idTextos')
    .then(resultado =>{
        console.log(resultado)
        let librarian = resultado[0].cedula
        console.log(librarian)
        db('lectores').select('primerNombre').innerJoin('usuarios','lectores.idUsuarios','usuarios.id')
        .innerJoin('prestamos', 'prestamos.idLectores', 'lectores.id').
        innerJoin('detallePrestamos','detallePrestamos.idPrestamos','prestamos.id')
        .then(respuesta =>{
            console.log('hola '+respuesta[0].primerNombre)  
            return res.status(202).json({ resultado,
            respuesta,
            ok:true}                                                              
            )
        })
        .catch(error=>{
            return res.status(500).json({
                error,
                ok: false,
                
            })
        })
    })
}

let agregarPrestamos = (req,res) =>{
    const tabla = 'prestamos'
    let campos = req.body.campos
    db(tabla).insert(campos).then( resultado =>{
        console.log(resultado)
        return res.status(200).json({
        ok:true
    })
    })
    .catch(error=>{
    return res.status(500).json({
        error,
        ok: false
    })
    })
}

//vale
let buscarLector = (req, res) =>{
    const tabla = 'usuarios'
    let campos = ['lectores.id','primerNombre', 'primerApellido', 'cedula'] 
    //let nombre = req.body.nombre
    //let apellido = req.body.apellido
    let ced = req.body.cedula
    db(tabla).select(campos).innerJoin('lectores', 'lectores.idUsuarios', 'usuarios.id').
    where({'usuarios.cedula': ced})
    .then(resultado =>{
    
        console.log(resultado)
        return res.status(200).json({
        resultado,
        ok:true
    })
    })
    .catch(error=>{
    return res.status(500).json({
        error,
        ok: false
    })
    })
}

//vale
let buscarBibliotecario = (req, res) =>{
    const tabla = 'usuarios'
    const campos = ['bibliotecarios.id','primerNombre', 'primerApellido', 'cedula'] 
    //let nombre = req.body.nombre
    //let apellido = req.body.apellido
    let ced = req.body.correo
    db(tabla).select(campos).innerJoin('bibliotecarios', 'bibliotecarios.idUsuarios', 'usuarios.id').
    where({'usuarios.correo': ced})
    
    .then(resultado =>{
    
        console.log(resultado)
        return res.status(200).json({
        resultado,
        ok:true
    })
    })
    .catch(error=>{
    return res.status(500).json({
        error,
        ok: false
    })
    })
}

//vale 
let buscarTexto=(req,res) =>{
    const tabla = 'textos'
    //let campos = req.body.campos
    let libro = req.body.libro
    db(tabla).select("*").innerJoin('ejemplares', 'ejemplares.idTextos', 'textos.id').
    where({'ejemplares.idDisponibilidad' : 1, 'ejemplares.estado': true, 'ejemplares.codigo': libro})
    .then(resultado =>{
        console.log(resultado)
        return res.status(200).json({
            resultado,
            ok:true
        })
        })
        .catch(error=>{
        return res.status(500).json({
            error,
            ok: false
        })
    })
}

let ingresarDetallePrestamo = (req,res)=>{
    let tablaPrestamo = 'prestamos'
    let tabla = 'detallePrestamos'
    let campos = req.body.campos

    let idE = campos.idEjemplares
    db.select('id').from(tablaPrestamo)
    .then(resultado =>{
        console.log(resultado)
        if(resultado[0].id > 0){
            db(tabla).insert({'idPrestamos': resultado[resultado.length-1].id, 'idEjemplares': idE})
            
            .then(resul => {
                console.log()
                return res.status(200).json({
                    ok: true,
                    mensaje: "el registro fue guardado correctamente ",
                    
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

let actualizarDisponinbilidad = (req, res) =>{
    const tabla = 'ejemplares'
    let idE = req.body.idEjemplares
    db(tabla).where({id:idE})
    .update({idDisponibilidad:2})
    .then(resultado =>{
        console.log(resultado)
        return res.status(200).json({
            resultado,
            ok:true
        })
        })
        .catch(error=>{
        return res.status(500).json({
            error,
            ok: false
        })
    })
}

module.exports={
    consultarPrestamos,
    agregarPrestamos,
    buscarLector,
    buscarBibliotecario,
    buscarTexto,
    ingresarDetallePrestamo,
    actualizarDisponinbilidad
}