const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar");
const navLink = document.querySelectorAll(".nav-link");

// Agrego un evento para escuchar cada elemento del menú
hamburger.addEventListener("click", mobileMenu);
navLink.forEach((element) => element.addEventListener("click", closeMenu));

// Función para que muestre el menú en dispositivos móviles
function mobileMenu() {
  hamburger.classList.toggle("move");
  navMenu.classList.toggle("active");
}

// Función para cerrar el menú en dispositivos móviles
function closeMenu() {
  hamburger.classList.remove("move");
  navMenu.classList.remove("active");
}

// Función para cuando la ventana llega el "break point" (768) el menú se cierra solo
window.addEventListener("resize", myScript);

function myScript() {
  let pageWindow = window.outerWidth;
  if (pageWindow > 768) {
    hamburger.classList.remove("move");
    navMenu.classList.remove("active");
  }
}
