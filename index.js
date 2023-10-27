import { obtenerProductos, eliminarProducto } from "./api.js"; 

const listado = document.querySelector('#listado-Productos');
const create = document.querySelector('#registrar')
const inputC = document.querySelector('#create-input')
const notificacion = document.querySelector('.notificacion')



document.addEventListener('DOMContentLoaded', mostrarProductos);
listado.addEventListener('click', confirmarEliminar);

async function mostrarProductos() {
    const productos = await obtenerProductos();

    console.log(productos);

    productos.forEach(i => {
        const {nombre, precio, categoria, id} = i;
        const row = document.createElement('tr');

        row.innerHTML += ` <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
         <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">${nombre}</p>
        </td>
        
        <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
         <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">${precio}</p>
        </td>
        
        <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
         <p class="text-gray-700 font-medium text-lg font-bold text-sm leading-5">${categoria}</p>
        </td>
        
        <td class="py-4 px-6 border-b border-gray-200 whitespace-no-wrap">
         <a href="editar-producto.html?id=${id}" class="text-teal-600 mr-5 hover:text-teal-900">Editar</a>
         <a href="#" data-producto="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
        </td>
        `

    listado.appendChild(row)
    });
}

async function confirmarEliminar(e) {
    if(e.target.classList.contains('eliminar')){
        const productoId = parseInt(e.target.dataset.producto);
        console.log(productoId);

       const confirmar = confirm('Quieres eliminar este producto');

       if (confirmar) {
            await eliminarProducto(productoId)
       }
    }
}


create.addEventListener('submit', async e => {
    e.preventDefault();

    const respuesta = await fetch('http://localhost:3000/Mesero', {
        method:'GET'
    });
    const usuarios = await respuesta.json();

    const usuario = usuarios.find(usuario => usuario.nombre === inputC.value);

    
    if(!inputC.value){
        //console.log("no puede estar vacio");
        notificacion.innerHTML = "el usuario no puede estar vacio";
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.remove('show-notification')
        },2000);
    }else if(usuario){
       // console.log('existe');
        notificacion.innerHTML = "El usuario ya existe";
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.remove('show-notification')
        },2000);
    }else{
        await fetch('http://localhost:3000/Mesero', {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({nombre:inputC.value})
        });
        notificacion.innerHTML = `El usuario ${createInput.value} ha sido creado`
        notificacion.classList.add('show-notification');
        setTimeout(()=>{
            notificacion.remove('show-notification')
        },2000);
        createInput.value = '';
    }
})

const btnCerrar = document.querySelector('#btn-cerrar')

btnCerrar.addEventListener('click', async e=> {
    localStorage.removeItem('usuario');
    window.location.href = '../Home/index.html'
})
//(function name(params) {
// sintaxis de funcion    
//})