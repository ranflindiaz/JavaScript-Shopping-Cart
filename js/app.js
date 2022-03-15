//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

//Lista Cursos
const listaCursos = document.querySelector('#lista-cursos');

cargarEventListener();
function cargarEventListener() {
	//Cuando agregas un curso presionando "Agregar al carrito"
	listaCursos.addEventListener('click', agregarCurso);

	//Elimina cursos del carrito
	carrito.addEventListener('click', eliminarCurso);

	//Vaciar carrito
	vaciarCarrito.addEventListener('click', () => {
		articulosCarrito = []; //reseteamos el arreglo

		limpiarHTML(); // eliminamos todo el HTML del carrito
	});
}

//Funciones
function agregarCurso(e) {
	e.preventDefault();

	if (e.target.classList.contains('agregar-carrito')) {
		const cursoSeleccionado = e.target.parentElement.parentElement;

		leerDatosCurso(cursoSeleccionado);
	}
}

//Elimina un curso del carrito
function eliminarCurso(e) {
	if (e.target.classList.contains('borrar-curso')) {
		const cursoId = e.target.getAttribute('data-id');

		//Elimina del arreglo articulosCarrito por el data-id
		articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

		carritoHTML(); // iterar sobre el carrito y mostramos el html
	}
}

//Lee el contenido del html del contenido al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
	//Crear un objeto con el contenido del curso actual
	const infoCurso = {
		imagen: curso.querySelector('img').src,
		titulo: curso.querySelector('h4').textContent,
		precio: curso.querySelector('.precio span').textContent,
		id: curso.querySelector('a').getAttribute('data-id'),
		cantidad: 1,
	};

	//Revisa si un elemento ya existe en un carrito
	const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
	if (existe) {
		//Actualizando la cantidad
		const cursos = articulosCarrito.map(curso => {
			if (curso.id === infoCurso.id) {
				curso.cantidad++;
				return curso; // Retorna el objeto actualizado
			} else {
				return curso; // Retorna los objetos que no son duplicados
			}
		});
		articulosCarrito = [...cursos];
	} else {
		articulosCarrito = [...articulosCarrito, infoCurso];
	}

	//Agrega elemento al arreglo de carrito

	console.log(articulosCarrito);

	carritoHTML();
}

//Muestra el carrito de compra en el html
function carritoHTML() {
	//Limpiar el HTMl
	limpiarHTML();

	//Recorre el carrito y genera el HTML
	articulosCarrito.forEach(curso => {
		const { imagen, titulo, precio, cantidad, id } = curso;

		const row = document.createElement('tr');
		row.innerHTML = `
                <td">
                   <img src="${imagen}" width="120"/> 
                </td>
                <td>${titulo}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td>
                    <a href="#" class="borrar-curso" data-id=${id}>X</a>
                </td>
            `;

		//Agrega el HTML del carrito en el tbody
		contenedorCarrito.appendChild(row);
	});
}

//Elimina los cursos del tbody
function limpiarHTML() {
	//Forma lenta
	//contenedorCarrito.innerHTML = '';

	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}
