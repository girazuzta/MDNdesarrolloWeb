// creación de constantes necesarias
const rememberDiv = document.querySelector('.remember');
const forgetDiv = document.querySelector('.forget');
const form = document.querySelector('form');
const nameInput = document.querySelector('#entername');
const submitBtn = document.querySelector('#submitname');
const forgetBtn = document.querySelector('#forgetname'); 
const h1 = document.querySelector('h1');
const personalGreeting = document.querySelector('.personal-greeting');

// prevenir que el formulario se envíe cuando se apreta un botón
form.addEventListener('submit', function(e) {
    e.preventDefault();
});

// ejecutar función cuando el botón 'Di hola' es clickeado
submitBtn.addEventListener('click', function(){
    localStorage.setItem('name', nameInput.value);// graba localmente el nombre ingresado en el input
    nameDisplayCheck(); // ejecuta esta función 
})

// función para cuando se aprieta el botón de olvidar
forgetBtn.addEventListener('click', function(){
    localStorage.removeItem('name'); // elimina el dato guardado previamente
    nameDisplayCheck(); 
});

// definimos la función nameDisplayCheck
function nameDisplayCheck () {
    if (localStorage.getItem('name')) { // comprobación de que existe un nombre guardado
       let name = localStorage.getItem('name');
       h1.textContent = 'Welcome, '+ name; // reescribe el título y el texto con la clase personalGreeting
       personalGreeting.textContent = 'Bienvenido a nuestro sitio, '+ name + '!'
       forgetDiv.style.display = 'block'; // bloquea el div de olvidar
       rememberDiv.style.display = 'none'; // oculta el div de recordar
    } else {
        h1.textContent = 'Bienvenido a nuestro sitio'; //en caso que no haya nombre se muestra el mensaje genérico por defecto
        personalGreeting.textContent = 'Bienveniddo a nuestro sitio, disfrute, goce, muevelo'
        forgetDiv.style.display = 'none';
        rememberDiv.style.display = 'block';
    }
}

// corremos la función nameDisplayCheck cada vez que se carga la página para corroborar que no esté guardado el nombre de visitas anteriores
document.body.onload = nameDisplayCheck;

// En terminal => python -m http.server => para iniciar servidor web (python tiene que estar instalado antes)
// Ir a localhost:8000/ajax-start.html para ver la página hosteada desde el servidor