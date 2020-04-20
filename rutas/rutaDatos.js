;
// se carga la dependencia de express
const express = require('express')
// cargamos el route de express.js y se puede crear aqui rutas
let api = express.Router()
//cargamos el modulo controlador
const crudControl = require('../controles/crud')
const usuarioControl = require('../controles/usuarioCrud')
const multipart = require('connect-multiparty')
const preguntasControl = require('../controles/preguntasCrud')
const imagenesControl = require('../controles/imagenesCrud')
const prestamosControl = require('../controles/prestamosCrud')
const devolucionesControl = require('../controles/devoluciones')
const historialControl = require('../controles/historiales')
let multipartImg = multipart()
const textosControl = require('../controles/textosCrud')

//get = leer post=crear
//creamos la ruta con el metodo get para lectura, para pasar el metodo que va a tner que cargar la pagina cuando hagamos la peticion http de esa ruta
api.get('/probando_rutas', crudControl.prueba)
api.post('/ingresar-datos', crudControl.ingresarDatos)
api.post('/leer-datos',crudControl.leerDatos)
api.post('/get-general', textosControl.getGeneral)//trae todos los registros isn niguna condicion
api.post('/get-activos', textosControl.getActivos)// trae los registros con estado verdadero
api.post('/verificar-correo', usuarioControl.verificarCorreo)
api.put('/cambiar-clave', crudControl.cambioClave)
api.post('/recuperacion-uno',usuarioControl.recuperarUno)
api.post('/recuperacion-dos',usuarioControl.recuperarDos)
api.put('/eliminado-logico', crudControl.deleteLogic)//se usa para todos
api.put('/actualizar-datos', crudControl.putData)
api.delete('/eliminar-datos', crudControl.deleteDatos)//no se usa

//usuarios
api.post('/ingresarLector', usuarioControl.ingresarLector)  
api.post('/ingresarBibliotecario', usuarioControl.ingresarBibliotecario)
api.post('/loginLector',usuarioControl.loginLector)
api.post('/loginBibliotecario', usuarioControl.loginBibliotecario)
//preguntas
api.post('/postRespuesta', preguntasControl.ingresarRespuestas)
//imagenes
api.post('/subir-imagen', multipartImg, imagenesControl.subirImagen)
//textos
api.get('/get-autores', textosControl.getAutores)
api.get('/get-textos', textosControl.getTextos)
api.get('/get-ejemplares', textosControl.getEjemplares)
api.get('/get-ejemplares-lector', textosControl.getEjemplaresLector)
api.post('/post-textos-autores', textosControl.postTextosAutores)

//rpueba
api.get('/get-prestamos', prestamosControl.consultarPrestamos)
api.post('/post-prestamos', prestamosControl.agregarPrestamos)
// lector
api.post('/get-lector', prestamosControl.buscarLector)
//bibliotecario
api.post('/get-bibliotecario',prestamosControl.buscarBibliotecario)
//ejemplares
api.post('/get-ejemplar',prestamosControl.buscarTexto)
//detallePrestamo
api.post('/post-detalle-prestamo', prestamosControl.ingresarDetallePrestamo)
api.put('/put-disponibilidad',prestamosControl.actualizarDisponinbilidad)
api.post('/get-historiales', historialControl.mostrarHistorial)

api.get('/getDevoluciones',devolucionesControl.getDevoluciones)
api.post('/postDevoluciones',devolucionesControl.agregarDevoluciones)
api.get('/leer-prestamos', devolucionesControl.leerPrestamos)

module.exports = api