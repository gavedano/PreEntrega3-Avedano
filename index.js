class Producto {
  constructor(producto) {
    this.id = producto.id;
    this.marca = producto.marca;
    this.precio = producto.precio;
    this.cantidad = producto.cantidad;
    this.precioTotal = producto.precio;
  }

  agregarUnidad() {
    this.cantidad++;
  }

  quitarUnidad() {
    this.cantidad--;
  }

  actualizarPrecioTotal() {
    this.precioTotal = this.precio * this.cantidad;
  }
}
function imprimirProductosEnHTML(array) {
  let contenedor = document.getElementById("contenedor"); //CONTENEDOR DE LAS TARJETAS
  contenedor.innerHTML = "";

  for (const producto of array) {
    let card = document.createElement("div"); //CREO EL DIV, PARA LAS TARJETAS
    card.innerHTML = `
    <div class="card text-center m-2 mb-5" style="width: 18rem;">
        <div class="card-body" style=" height: 33rem; ">
            <img src="${producto.img}" id="" class="card-img-top img-fluid" alt="placa_de_video ">
            <h2 class="card-title">${producto.marca}</h2>
            <h5 class="card-subtitle mb-2 text-muted">${producto.descripcion}</h5>
            <p class="card-text fs-2 fw-bold">$${producto.precio}</p>
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button id="agregar${producto.marca}${producto.id}" type="button" class="btn btn-success"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg> Agregar</button>
            </div>
        </div>
    </div>      
    `; //CODIGO BOOTSTRAP PARA TARJETAS, INGRESADO AL HTML VIA JS

    contenedor.appendChild(card); //AGREGO LA TARJETA AL CONTENEDOR

    let boton = document.getElementById(
      `agregar${producto.marca}${producto.id}`
    );
    boton.addEventListener("click", () => agregarAlCarrito(producto));
  }
}
function agregarAlCarrito(producto2) {
  let index = carrito.findIndex((elemento) => elemento.id === producto2.id);
  console.log({ index });
  if (index != -1) {
    carrito[index].agregarUnidad();
    carrito[index].actualizarPrecioTotal();
  } else {
    let producto = new Producto(producto2);
    producto.cantidad = 1;
    carrito.push(producto);
  }
  localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
  imprimirTabla(carrito);
}
function eliminarDelCarrito(id) {
  let index = carrito.findIndex((element) => element.id === id);
  if (carrito[index].cantidad > 1) {
    carrito[index].quitarUnidad();
    carrito[index].actualizarPrecioTotal();
  } else {
    carrito.splice(index, 1);
  }
  localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
  imprimirTabla(carrito);
}
function eliminarCarrito() {
  carrito = [];
  localStorage.removeItem("carritoEnStorage");
  swal("Compra eliminada con éxito", "", "success");

  document.getElementById("tabla-carrito").innerHTML = "";
  document.getElementById("acciones-carrito").innerHTML = "";
}

function obtenerPrecioTotal(array) {
  return array.reduce((total, elemento) => total + elemento.precioTotal, 0);
}
function imprimirTabla(array) {
  let contenedor = document.getElementById("tabla-carrito");
  contenedor.innerHTML = "";
  let tabla = document.createElement("div");
  tabla.innerHTML = `
        <table id="tablaCarrito" class="table table-striped table-light text-align-center justify-content-center">
            <thead>         
                <tr>
                    <th>Item</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Accion</th>
                </tr>
            </thead>

            <tbody id="bodyTabla">

            </tbody>
        </table>
    `;

  contenedor.appendChild(tabla);
  let bodyTabla = document.getElementById("bodyTabla");

  for (let producto of array) {
    let datos = document.createElement("tr");
    datos.innerHTML = `
              <td>${producto.marca}</td>
              <td>${producto.cantidad}</td>
              <td>$${producto.precioTotal}</td>
              <td><button id="eliminar${producto.id}" class="btn btn-danger">Eliminar</button></td>
    `;

    bodyTabla.appendChild(datos);

    let botonEliminar = document.getElementById(`eliminar${producto.id}`);
    botonEliminar.addEventListener("click", () =>
      eliminarDelCarrito(producto.id)
    );
  }

  let precioTotal = obtenerPrecioTotal(array);
  let accionesCarrito = document.getElementById("acciones-carrito");
  accionesCarrito.innerHTML = `
  <h5>PrecioTotal: $${precioTotal}</h5></br>
  <button id="vaciarCarrito" onclick="eliminarCarrito()" class="btn btn-warning">Vaciar Carrito</button>
`;
}

function chequearCarritoEnStorage() {
  let contenidoEnStorage = JSON.parse(localStorage.getItem("carritoEnStorage"));

  if (contenidoEnStorage) {
    let array = [];

    for (const objeto of contenidoEnStorage) {
      let producto = new Producto(objeto);
      producto.actualizarPrecioTotal();
      array.push(producto);
    }
    imprimirTabla(array);
    return array;
  }
  return [];
}
const productos = [
  {
    id: 0,
    marca: "AMD",
    descripcion:
      "Placa de Video SAPPHIRE AMD Radeon RX 6500 XT PULSE OC 4GB GDDR6 PCIe 4.0",
    precio: 2000,
    img: "./imgs/placa1.jpg",
  },
  {
    id: 1,
    marca: "NVIDIA",
    descripcion:
      "Placa de Video Palit NVIDIA GeForce GTX 1660 Dual 6GB GDDR5 PCIe 3.0",
    precio: 2500,
    img: "./imgs/placa2.jpg",
  },
  {
    id: 2,
    marca: "NVIDIA",
    descripcion:
      "Placa de Video Palit NVIDIA GeForce GT 730 2GB DDR3 PCIe 2.0x8",
    precio: 2700,
    img: "./imgs/placa3.jpg",
  },
  {
    id: 3,
    marca: "AMD",
    descripcion:
      "Placa de Video PowerColor AMD Radeon RX 6600 Fighter 8GB GDDR6 PCIe 4.0 (BULK)",
    precio: 3500,
    img: "./imgs/placa4.jpg",
  },
  {
    id: 4,
    marca: "NVIDIA",
    descripcion:
      "Placa de Video MSI NVIDIA GeForce RTX 2060 SUPER VENTUS GP OC 8GB GDDR6 PCIe 3.0",
    precio: 4000,
    img: "./imgs/placa5.jpg",
  },
  {
    id: 5,
    marca: "AMD",
    descripcion:
      "Placa de Video PowerColor AMD Radeon RX 6600 Fighter 8GB GDDR6 PCIe 4.0",
    precio: 3000,
    img: "./imgs/placa6.jpg",
  },
];
imprimirProductosEnHTML(productos);
let carrito = chequearCarritoEnStorage();
