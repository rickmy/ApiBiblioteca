;
let app = require('./app')
let port = 3000

app.listen(port, () => {
  console.log(`El servicios está funcionando en el puerto ${ port }`)
  console.log('la base de datos fue conectada correctamente')
})


