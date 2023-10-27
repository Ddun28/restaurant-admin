const login = document.querySelector('#login')
const inputL = document.querySelector('#input-login')
const notificacion = document.querySelector('.notificacion')


login.addEventListener('submit', async e => {
    e.preventDefault()

    const respuesta = await fetch('http://localhost:3000/Mesero', {
        method:'GET'
    });
    const usuarios = await respuesta.json();

    const usuario = usuarios.find(usuario => usuario.nombre === inputL.value);

    const response = await fetch('http://localhost:3000/admin', {
        method:'GET'
    });

    const administrador = await response.json()

    const admin = administrador.find(admin => admin.nombre === inputL.value)

    if(usuario){
        localStorage.setItem('usuario', JSON.stringify(usuario));
        window.location.href = '../pedidos/index.html'
    }else if (admin){
        localStorage.setItem('usuario', JSON.stringify(admin));
        window.location.href = '../index.html'
    }else{
        notificacion.innerHTML = `El usuario no existe`
        notificacion.classList.add('show-notification');
        setTimeout(()=>{
            notificacion.remove('show-notification')
        },2000);
    }
})