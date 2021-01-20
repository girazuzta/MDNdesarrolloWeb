const thumBar = document.querySelector(".thumb-bar");

for (let i = 1; i <= 5; i++ ) {

    const newDiv = document.createElement ('div');

    const pic = document.createElement('img');

    pic.src = 'images/pic'+i+'.jpg';

    thumBar.appendChild(newDiv);

    newDiv.appendChild(pic);
    
    pic.onclick = function () {
        const picSeleccionada = document.querySelector(".displayed-img");
        picSeleccionada.src = 'images/pic'+i+'.jpg';
    }
}

const overlay = document.querySelector(".overlay");
const button = document.querySelector(".dark")
let picEstado = "claro";

button.onclick = function () {
    if (picEstado === "claro") {
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        button.textContent = "Aclarar";
        picEstado = "oscuro";
    }
    else {
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
        button.textContent = "Oscurecer";
        picEstado = "claro";
    }
}