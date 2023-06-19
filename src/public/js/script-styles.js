/*Activar evento de botones*/
document.getElementById("btn__registro").addEventListener('click', register);
document.getElementById("btn__iniciar_sesion").addEventListener('click', login);
window.addEventListener('resize', anchoPagina);

/*Formularios*/
var contenedor_login_register = document.querySelector(".contenedor__formularios-registro");
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__registrar");

/*Cajas*/
var caja_login = document.querySelector(".caja__trasera-login");
var caja_register = document.querySelector(".caja__trasera-registro");

function anchoPagina() {
    if (window.innerWidth < 850) {
        caja_login.style.display = "none";
        caja_login.style.opacity = "0";
        caja_register.style.display = "block";
        caja_register.style.opacity = "1";
    } else {
        caja_register.style.display = "block";
        caja_register.style.opacity = "1";
        caja_login.style.display = "block";
        formulario_login.style.display = "block";
        formulario_register.style.display = "none";
        contenedor_login_register.style.left = "0px";
    }
}

//Cambiar a registrar
function register(){

    if (window.innerWidth > 850) {
        formulario_register.style.display = "block";
        formulario_login.style.display = "none";
        contenedor_login_register.style.left = "410px";
        caja_login.style.opacity = "1";
        caja_register.style.opacity = "0";
    
    } else {
        formulario_register.style.display = "block";
        formulario_login.style.display = "none";
        contenedor_login_register.style.left = "0px";
        caja_login.style.display = "block";
        caja_login.style.opacity = "1";
        caja_register.style.display = "none";    
    }
    
}

//Cambiar a login
function login(){

    if (window.innerWidth > 850) {
        formulario_register.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "20px";
        caja_login.style.opacity = "0";
        caja_register.style.opacity = "1";

    } else {
        formulario_register.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        caja_login.style.display = "none";
        caja_register.style.display = "block";
    }

    
}

anchoPagina();

