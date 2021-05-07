// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

let db; // variable que almacenará a un objeto que hará de base de datos
window.onload = function () {
    let request = window.indexedDB.open('notes_db', 1); // intenta abrir la BD 'notes_db' versión 1. 
    request.onerror = function () { // onerror handler = true cuando falla la apertura de la Db
        console.log('Apertura de DB fallida');
    };
    request.onsuccess = function () {
        console.log('DB abierta exitosamente');
        db = request.result; // almacena la db en la variable
        displayData(); // ejecuta función que muestra los datos almacenados
    };
    request.onupgradeneeded = function (e) { // este evento sucede cuando no existe la DB creada en el usuario
    let db = e.target.result; // este es el objeto devuelto por el evento
    let objectStore =  db.createObjectStore('notes_os', {keyPath: 'id', autoIncrement: true}); // este método crea la base de datos de nombre notes_os y con cada registro incrementa el valor de ID. 
    objectStore.createIndex('title', 'title', {unique: false}); // crea campo título, cuya leyenda es título tmb y que no necesariamente es único. 
    objectStore.createIndex('body', 'body', {unique: false}); // idem 
    console.log('DB configuración completada'); 
    };
}
form.onsubmit = addData; 
function addData (e) {
    e.preventDefault(); // prevenir el envío por defecto del formulario
    let newItem = {title: titleInput.value, body: bodyInput.value}; // crea objeto netItem con atributos titleInput y bodyInput donde graba los valores del formulario
    let transaction = db.transaction(['notes_os'], 'readwrite'); // método que abre una transacción read/write en la db
    let objectStore = transaction.objectStore('notes_os'); // busca a un objeto ya creado en la db con el nombre especificado
    let request = objectStore.add(newItem); // agrega el objeto creado con el formulario en el objeto de la db 
    request.onsuccess = function() { // limpiar formulario
        titleInput.value = '';
        bodyInput.value = '';
    };
    transaction.oncomplete = function () { // reportar el evento de cambio de la base de datos
        console.log('transacción completada: modificación de base de datos finalizada');
        displayData(); // mostrar las notas guardadas
    };
    transaction.onerror = function () {
        console.log('transacción fallida')
    };  
};
// declarar la función de renderizado de las notas
function displayData () {
    while (list.firstChild) { // si la lista tiene items (childs) entonces removerlos
        list.removeChild(list.firstChild) // esto se hace debido a que posteriormente se van a insertar de nuevo al traer todos los datos de la db
    };
    let objectStore = db.transaction('notes_os').objectStore('notes_os'); // abrir el objeto DB
    objectStore.openCursor().onsuccess = function(e) { // IDBObjectStore.openCursor() es un método que abre un cursor que permite iterar entre los registros
        let cursor = e.target.result; // guardamos la referencia al cursor
        if (cursor) { // si el cursor tiene un item de la db proceder a crear el dom que muestre sus datos
            // creamos un item de lista y sus elementos
            const listItem = document.createElement('li');
            const h3 = document.createElement('h3');
            const para = document.createElement('p');
            // anexamos elementos para construir el dom
            listItem.appendChild(h3); 
            listItem.appendChild(para);
            list.appendChild(listItem);
            // poblamos los elementos con los datos del objeto cursor
            h3.textContent = cursor.value.title; 
            para.textContent = cursor.value.body;
            listItem.setAttribute('data-note-id', cursor.value.id); // método que agrega un atributo al item en el cual grabamos el id
            // creamos un botón para eliminar el item, lo anexamos al item, le indicamos su contenido y manejador de evento
            const deleteBtn = document.createElement('button');
            listItem.appendChild(deleteBtn);
            deleteBtn.textContent = 'Borrar';
            deleteBtn.onclick = deleteItem; 
            // iterar al próximo item con cursor (esto vuelve a hacer la comprobación del if, hasta que se agotan las iteraciones)
            cursor.continue();
        } else {
            // mostrar que no hay notas si la lista quedó vacía despues de haber iterado todos los items con cursor
            if(!list.firstChild) { // no tiene first child la lista
                const listItem = document.createElement('li');
                listItem.textContent = 'no hay notas guardadas';
                list.appendChild(listItem);
            };
            console.log('todas las notas fueron presentadas')
        };
    };  
};
// declarar la función de borrado
function deleteItem (e) {
    // obtenemos el id almacenado en el item de lista (que es el padre del botón al que se le hace click)
    let noteId = Number(e.target.parentNode.getAttribute('data-note-id')); 
    // hacemos el DELETE de la DB
    let transaction = db.transaction(['notes_os'], 'readwrite');
    let objectStore = transaction.objectStore('notes_os');
    let request = objectStore.delete(noteId); 
    // reportar que se completó la eliminación
    transaction.oncomplete = function () {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode); // remover el hijo del abuelo.. el padre XD 
        console.log('nota'+ noteId + 'borrada');
    // nuevamente indicar que no hay notas si queda vacía la lista
    if(!list.firstChild) { // no tiene first child la lista
        const listItem = document.createElement('li');
        listItem.textContent = 'no hay notas guardadas';
        list.appendChild(listItem);
        };
    };
};
// En terminal => python -m http.server => para iniciar servidor web (python tiene que estar instalado antes)
// Ir a localhost:8000/ajax-start.html para ver la página hosteada desde el servidor