'use strict'; //Indico que antes de usar algo lo tengo que declarar

const express = require('express'); //La variable express apunta al paquete express
const path = require('path');

//Constants
const PORT = 8081; //puerto que quiero utilizar

//App
const app = express(); //Creo el servidor

app.use(express.static(__dirname)); //Para evitar usar paths relativos

//Cuando llame a http://localhost:8081/ lo que tiene que ejecutar
app.get('/', function(req, res) { //req lo que me llega y res lo que devuelvo
  //res.send('Welcome to the real world!!!!! \n');
  res.sendFile(path.join(__dirname + '/index.html')); //__dirname e s variable interna de node.js y es la raiz del proyecto
});

/*
//Cuando llame a http://localhost:8080/detallePost lo que tiene que ejecutar
app.get('/detallePost/:id', function(req, res) { //req lo que me llega y res lo que devuelvo
  //res.send('Welcome to the real world!!!!! \n');
  res.sendFile(path.join(__dirname + '/detallePost.html')); //__dirname e s variable interna de node.js y es la raiz del proyecto
});

//Cuando llame a http://localhost:8080/admin lo que tiene que ejecutar
app.get('/admin/', function(req, res) { //req lo que me llega y res lo que devuelvo
  //res.send('Welcome to the real world!!!!! \n');
  res.sendFile(path.join(__dirname + '/admin.html')); //__dirname e s variable interna de node.js y es la raiz del proyecto
});
*/

app.listen(PORT);
console.log('BloggiTech funcionando en el puerto ' + PORT);
