;
let config = require('../knexfile')
let env = 'development'
let db = require('knex')(config[env])

postTextosAutores=(req,res)=>{
    const tablaTextoAutores = 'textosAutores'
    const tabla = 'textos'
    const codigoIng = req.body.codigo
    const idAutor = req.body.autor
    console.log(codigoIng)
    console.log(idAutor)

    
       db.select('id').from(tabla).where({codigo:codigoIng})
       .then(resultado =>{
           let idTexto = resultado[0].id
           console.log(idTexto)
          
               db(tablaTextoAutores).insert({'idTextos':idTexto,'idAutores':idAutor})
               .then(resultado =>{
                    return res.status(200).json({
                        ok:true,
                        mensaje: "el registro fue guardado correctamente "
                    })
               })
               .catch(error =>{
                   return res.status(500).json({
                       error
                   })
               })
           
       })
       .catch(error =>{
        return res.status(500).json({
            error
        })
    })
    

}

getAutores=(req,res)=>{

    const tabla = 'autores'
    const campos = ['autores.id','nombre','apellido','nacionalidad']

    db.select(campos).from(tabla).innerJoin('nacionalidades','autores.idNacionalidades','nacionalidades.id').where({'autores.estado':true}).then(
        registro=>{
            console.log(registro)
            return res.status(200).json(
                data = registro
            )
        }
    )
    .catch(error=>{
        return res.status(404).json(
           { ok:false}
        )
    })
    
}

getTextos=(req,res)=>{
    const tabla ='textos'
    const campos = ['textos.id','codigo','titulo','editorial','tipoTexto','descripcion','nombre','apellido']
    db(tabla).select(campos).innerJoin('editoriales','textos.idEditoriales','editoriales.id')
    .innerJoin('tipoTextos','textos.idTipoTextos','tipoTextos.id')
    .innerJoin('textosAutores','textosAutores.idTextos','textos.id')
    .innerJoin('autores','textosAutores.idAutores','autores.id')
    .where({'textos.estado':true})
    .then(resultado=>{
        return res.status(200).json(
            resultado
        )
    })
    .catch(error=>{
        return res.status(500).json({
            ok: false,
            error
        })
    })
}



getEjemplares=(req,res)=>{
    const tabla = 'ejemplares'
    const campos = ['ejemplares.codigo','titulo','fechaPublicacion','stand','estadoConservacion','disponibilidad']

    db(tabla).select(campos).innerJoin('textos','ejemplares.idTextos','textos.id')
    .innerJoin('stand','ejemplares.idStand','stand.id')
    .innerJoin('estadoConservaciones','ejemplares.idEstadoConservaciones','estadoConservaciones.id')
    .innerJoin('disponibilidades','ejemplares.idDisponibilidad','disponibilidades.id')
    .where({'ejemplares.estado':true})
    .then(resultado=>{
        return res.status(200).json(
            resultado
        )
    })
    .catch(error=>{
        return res.status(500).json({
            ok: false,
            resultado
        })
    }) 
}

getEjemplaresLector=(req,res)=>{
    const tabla = 'ejemplares'
    const campos = ['ejemplares.codigo','titulo','fechaPublicacion','editorial','tipoTexto',
                    'autores.nombre','autores.apellido','textos.descripcion','stand','disponibilidad']

    db(tabla).select(campos)
    .innerJoin('textos','ejemplares.idTextos','textos.id')
    .innerJoin('textosAutores','textosAutores.idTextos','textos.id')
    .innerJoin('autores','textosAutores.idAutores','autores.id')
    .innerJoin('stand','ejemplares.idStand','stand.id')
    .innerJoin('estadoConservaciones','ejemplares.idEstadoConservaciones','estadoConservaciones.id')
    .innerJoin('disponibilidades','ejemplares.idDisponibilidad','disponibilidades.id')
    .innerJoin('editoriales','textos.idEditoriales','editoriales.id')
    .innerJoin('tipoTextos','textos.idTipoTextos','tipoTextos.id')
    
    .where({'ejemplares.estado':true})
    .then(resultado=>{
        console.log(resultado)
        return res.status(200).json(
            resultado
        )
    })
    
}

getGeneral = (req,res) =>{
    let tabla = req.body.tabla
    let campos = req.body.campos
    const condicion = {'estado':true}

    db(tabla).select(campos).where(condicion).then(resgitro =>{
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

getActivos = (req,res)=>{
    let tabla = req.body.tabla
    let campos = req.body.campos

    db(tabla).select(campos).where(condicion).then(resgitro =>{
        return res.status(200).json(
            resgitro
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
    getTextos,
    getEjemplares,
    getEjemplaresLector,
    getAutores,
    getGeneral,
    getActivos,
    postTextosAutores
}