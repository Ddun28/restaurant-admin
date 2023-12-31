const url = 'http://localhost:3000/menu'

export const nuevoProducto = async producto => {
    try {
        await fetch(url,{
            method:'POST',
            body:JSON.stringify(producto),
            headers:{
                'Content-Type' : 'application/json'
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const obtenerProductos = async () => {
    try {
        const resultado = await fetch(url);
        const prodcutos = await resultado.json();
        return prodcutos;
    } catch (error) {
        console.log(error);
    }
}

export const obtenerProducto = async id => {
    try {
        const resultado = await fetch(`${url}/${id}`);
        const producto = resultado.json();
        return producto;
    } catch (error) {
        console.log(error);
    }
}

export const editarProducto = async producto => {
    try {
        await fetch(`${url}/${producto.id}`,{
            method:'PUT',
            body:JSON.stringify(producto),
            headers: {
                'Content-Type' : 'application/json',
        }
        })      
    } catch (error) {
        console.log(error);
    }
}

export const eliminarProducto = async id => {
    try {
        await fetch(`${url}/${id}`, {
            method:'DELETE'
        })
    } catch (error) {
        console.log(error);
    }
}