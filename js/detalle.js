// Permite conocer el momento en el que todos los elementos del DOM
document.addEventListener("DOMContentLoaded", () => {
  // Llamo a la función para crear el detalle sobre el producto
  detalleProducto();
});

// Función para crear el detalle del producto
function detalleProducto() {
  // Obtenog el id del producto selecionado de la URL
  const urlParametros = new URLSearchParams(window.location.search);
  const codigoProducto = urlParametros.get("id");
  // Muestra la id obtenida del url
  console.log(codigoProducto);
  // Obtengo las datos almacenados en el "local storage" y lo convierto en un objeto JavaScript.
  const coffeeData = JSON.parse(localStorage.getItem("coffee"));
  // Busco por el id que obtuve por la url y lo comparo para obenter los datos
  const cafeSeleccionado = coffeeData.productos.find(
    (producto) => producto.código == codigoProducto
  );
  // Compruebo que tenga datos
  console.log(cafeSeleccionado);
  if (!cafeSeleccionado) {
    console.log("Error al obtener los datos del local storage");
  } else {
    // Si todo va bien, primero busco el contenedor donde va el detalle del producto.
    const detalleProducto = document.querySelector("#detail");
    // Creo todos los elementos necesarios
    const flexbox = document.createElement("div");
    const contenedorImagen = document.createElement("div");
    const contenido = document.createElement("div");
    const ingredientesLista = document.createElement("ul");
    const contenedorCaja = document.createElement("div");
    // Agrego las clases apropiadas a cada elemento
    flexbox.classList.add("detail-flex");
    contenedorImagen.classList.add("detail-img");
    contenido.classList.add("detail-content");
    ingredientesLista.classList.add("detail-list");
    contenedorCaja.classList.add("box-container");
    // Busco los datos específicos de cada elemento y se los asigno creando la estructura correspondiente
    contenedorImagen.innerHTML = `<img src="${cafeSeleccionado.imagen}" alt="${cafeSeleccionado.nombre}" />`;

    contenido.innerHTML = ` <h3 class="detail-title">${cafeSeleccionado.nombre}</h3>
                            <div class="detail-line"></div><div class="stars-outer"><div class="stars-inner"></div></div>
                            <span class="detail-price">$ ${cafeSeleccionado.precio}</span>
                            <p class="detail-text">${cafeSeleccionado.descripción}</p>
                            <p class="detail-text"><strong>Sabor: </strong>${cafeSeleccionado.sabor}</p>
                            <p class="detail-text"><strong>Ingredientes:</strong></p>`;

    // Recorro los ingredientes para colocarlos en una lista (No se la cantidad de ingredientes de cada café)
    cafeSeleccionado.ingredientes.forEach((ingrediente) => {
      for (let propiedad in ingrediente) {
        ingredientesLista.innerHTML += `<li class="list-item">${ingrediente[propiedad]}</li>`;
      }
    });
    //Agrego la primera sección al contenedor principal
    contenido.appendChild(ingredientesLista);
    flexbox.appendChild(contenedorImagen);
    flexbox.appendChild(contenido);
    detalleProducto.appendChild(flexbox);

    // Comienzo con la segunda sección
    detalleProducto.innerHTML += ` <h2 class="heading">Información Nutricional</h2>`;

    // Recorro los datos de la información nutricional
    cafeSeleccionado.información_nutricional.forEach((informacion) => {
      contenedorCaja.innerHTML = ` <div class="box">
                                    <p class="box-text">${informacion.calorías} Cal.</p>
                                    <p class="box-detail">Calorías</p>
                                   </div>
                                   <div class="box">
                                    <p class="box-text">${informacion.grasas}</p>
                                    <p class="box-detail">Grasa Total (8 % DV)</p>
                                   </div>
                                   <div class="box">
                                    <p class="box-text">${informacion.carbohidratos}</p>
                                    <p class="box-detail">Carbohidratos (15 % DV)</p>
                                   </div>
                                   <div class="box">
                                    <p class="box-text">${informacion.proteínas}</p>
                                    <p class="box-detail">Proteínas</p>
                                   </div>`;
    });

    //Continuo agregando la última parte de la segunda sección
    detalleProducto.appendChild(contenedorCaja);
    detalleProducto.innerHTML += `<div class="button-flex">
                                    <a href="./index.html#product" class="content-button"><i class="bi bi-caret-left-fill"></i>Volver</a>
                                  </div>`;
  }
  // Pinto las estrallas de color amarillo para que coincida con el "rating"
  document.querySelector(".stars-inner").style.width = ratingBar(cafeSeleccionado.puntuación);
}

// Función para calcular las estrellas del "rating"
function ratingBar(rating) {
  const starPercentage = (rating / 5) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
  return starPercentageRounded;
}
