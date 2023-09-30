// Permite acceder a la información de manera asíncrona (AJAX)
fetch("./json/coffee.json")
  .then((respuesta) => respuesta.json())
  .then((datos) => localStorage.setItem("coffee", JSON.stringify(datos)))
  .catch((err) => console.error(err));

// Permite conocer el momento en el que todos los elementos del DOM
document.addEventListener("DOMContentLoaded", () => {
  // Llamo a la función para crear las "cards producto"
  cargarProductos();
});

// Función para crear las "cards" producto
function cargarProductos() {
  // Obtengo las datos almacenados en el "local storage" y lo convierto en un objeto JavaScript.
  const coffeeData = JSON.parse(localStorage.getItem("coffee"));
  // Muestra la información obtenida
  console.log(coffeeData);
  // Compruebo que tenga datos
  if (!coffeeData) {
    console.log("Error al obtener los datos del local storage");
  } else {
    // Si todo va bien, primero busco el contenedor donde van a ir las "cards".
    const secciónGrid = document.querySelector("#product");
    // Recorro  todos los elementos que hay en "coffeData"
    coffeeData.productos.forEach((producto) => {
      // Creo todos los elementos necesarios
      const tarjeta = document.createElement("div");
      const contenedorImagen = document.createElement("div");
      const contenido = document.createElement("div");
      // Agrego las clases apropiadas a cada elemento
      tarjeta.classList.add("product-card");
      contenedorImagen.classList.add("card-img");
      contenido.classList.add("card-content");
      // Busco los datos específicos de cada elemento y se los asigno creando la estructura correspondiente
      contenedorImagen.innerHTML = `<img src="${producto.imagen}" alt="${producto.nombre}" />
                                    <span class="card-rating">${producto.puntuación}<i class="bi bi-star-fill"></i></span>
                                    <span class="card-temperature"><i class="${temperaturaCafe(producto.caliente)}"></i></span>`;

      contenido.innerHTML = `<h3 class="content-title">${producto.nombre}</h3>
                             <p class="content-price">$ ${producto.precio}</p>
                             <a href="detalle.html?id=${producto.código}" class="content-button">Ver más</a>`;
      //Agrego todo al contenedor principal
      tarjeta.appendChild(contenedorImagen);
      tarjeta.appendChild(contenido);
      secciónGrid.appendChild(tarjeta);
    });
  }
}

// Función que dependiendo de si el café caliente o no, utiliza una clase u otra
function temperaturaCafe(temperatura) {
  if (!temperatura) {
    return "bi bi-cup-straw";
  }
  return "bi bi-cup-hot";
}
