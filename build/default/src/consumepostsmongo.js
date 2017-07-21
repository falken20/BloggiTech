
//url con la que vamos a trabajar, es la de mlab que creamos y el apikey el nuestro de mlab (esta en la configuración del user)
const URL = "https://api.mlab.com/api/1/databases/dbbootcamp/collections/posts?apiKey=CQjEP7tpIq0_e_u0XbMU2o1Xgt8fgB74"

var response;

function obtenerPosts() {
  var peticion = new XMLHttpRequest();
  peticion.open("GET", URL, false); //El tercer parametro es para nidicar que sea modo sincrono
  //Por defecto es XML pero le decimos que json
  peticion.setRequestHeader("Content-Type", "application/json");
  peticion.send();
  //Como hemos indicado que es sincrona ahora deberiamos tener la respuesta
  response = JSON.parse(peticion.responseText);
  //Guardo en sessionStorage los posts para no volver a pedirlos
  sessionStorage["posts"] = peticion.responseText;
  console.log(response);

  //mostrarPosts();
}

//Voy a hacer que me saque un alert por cada post
function mostrarPosts() {
  var tabla = document.getElementById("tablaPosts");
  for (var i = 0; i < response.length; i++) {
    //alert(response[i].titulo);
    var fila = tabla.insertRow(i + 1); //no hay un new fila, creo objeto con insert y meto datos
    var celdaId     = fila.insertCell(0)
    var celdaTitulo = fila.insertCell(1);
    var celdaTexto  = fila.insertCell(2);
    var celdaAutor  = fila.insertCell(3);
    var celdaAction = fila.insertCell(4);

    celdaId.innerHTML = response[i]._id.$oid; //El id y oid los ves en el json como las ha llamado, por ejemplo mira lo que devuelve: https://api.mlab.com/api/1/databases/dbbootcamp/collections/posts?apiKey=CQjEP7tpIq0_e_u0XbMU2o1Xgt8fgB74

    if (response[i].titulo != undefined) {
      celdaTitulo.innerHTML = response[i].titulo;
    } else {
      celdaTitulo.innerHTML = "Título desconocido";
    }
    if (response[i].texto != undefined) {
      celdaTexto.innerHTML = response[i].texto;
    } else {
      celdaTexto.innerHTML = "Texto desconocido";
    }
    if (response[i].autor != undefined) {
      celdaAutor.innerHTML = response[i].autor.nombre + " " + response[i].autor.apellido;
    } else {
      celdaAutor.innerHTML = "Anonimo";
    }

    celdaAction.innerHTML = '<button class="btn btn-primary" onclick=\'actualizarPost("' + celdaId.innerHTML + '")\';>Actualizar</button>';
    celdaAction.innerHTML += ' <button class="btn btn-primary" onclick=\'eliminarPost("' + celdaId.innerHTML + '")\';>Borrar</button>';
  }
}

function anadirPost() {
  var peticion = new XMLHttpRequest();
  peticion.open("POST", URL, false); //Como es insertar uso POST. El false es para que no lo haga asincrono
  peticion.setRequestHeader("Content-Type", "application/json");
  peticion.send('{"titulo":"Nuevo post de JFK", "texto": "Texto del post JFK", "autor":{"nombre":"J.F", "apellido": "Kennedy"}}'); //Mando el json para el alta
}

function actualizarPost(id) {
  var peticion = new XMLHttpRequest();
  var URLItem = "https://api.mlab.com/api/1/databases/dbbootcamp/collections/posts/";
  URLItem += id;
  URLItem += "?apiKey=CQjEP7tpIq0_e_u0XbMU2o1Xgt8fgB74";
  peticion.open("PUT", URLItem, false); //Como es modificar uso PUT. El false es para que no lo haga asincrono
  peticion.setRequestHeader("Content-Type", "application/json");
  peticion.send('{"titulo":"Título cambiado"}')   //
}

function eliminarPost(id) {
  var peticion = new XMLHttpRequest();
  var URLItem = "https://api.mlab.com/api/1/databases/dbbootcamp/collections/posts/";
  URLItem += id;
  URLItem += "?apiKey=CQjEP7tpIq0_e_u0XbMU2o1Xgt8fgB74";
  console.log("Procedemos a borrar el post con id: " + id);
  peticion.open("DELETE", URLItem, false); //Como es eliminar uso DELETE. El false es para que no lo haga asincrono
  peticion.setRequestHeader("Content-Type", "application/json");
  peticion.send();
  console.log("El post con id: " + id + " ha sido borrado");
}

function seleccionarPost(numero) {
  sessionStorage["seleccionado"] = numero;
  var elJson = JSON.parse(sessionStorage["posts"]);
}

function buscarDetallesPost(numero) {
  console.log("Entro " + numero);
  var posts = JSON.parse(sessionStorage["posts"]);
  for (var i = 0; i < posts.length; i++) {
    if (posts[i]._id_$oid == numero) {
      //mostrar detalles
      document.getElementById("h1").innerHTML = numero;
      document.getElementById("h2").innerHTML = posts[i].titulo;
      document.getElementById("h3").innerHTML = posts[i].texto;
      break;
    }
  }
}
