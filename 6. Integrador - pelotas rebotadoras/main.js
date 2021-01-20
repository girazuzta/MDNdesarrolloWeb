// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); // método que resulta en un objeto que representa el área de dibujo

const width = canvas.width = window.innerWidth; // se asignan las dimensiones de la pantalla al canvas
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// Modelado de la bola como objeto

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y; 
    this.velX = velX;
    this.velY = velY;
    this.color = color; 
    this.size = size;
}

// Método de renderizado de la bola

Ball.prototype.draw = function(){
    ctx.beginPath(); // inicia un trazo
    ctx.fillStyle = this.color; // color de relleno del trazo
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // método .arc (X del centro, Y del centro, radio, angulo origen, angulo fin)
    ctx.fill(); //esto finaliza el trazo rellenandolo con el color definido
};

// Método de actualización de posición (movimiento)

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX); // cuando la pelota toca el extremo derecho invierte la velocidad
    }

    if ((this.x - this.size)<= 0) {
        this.velX = -(this.velX); //cuando la pelota toca el extremo izquierdo invierte la velocidad
    }

    if ((this.y + this.size)>= height) {
        this.velY = -(this.velY); //cuando la pelota toca el extremo inferior invierte la velocidad
    }

    if ((this.y - this.size)<= 0) {
        this.velY = -(this.velY); //cuando la pelota toca el extremo superior invierte la velocidad
    }

    this.x +=this.velX;
    this.y +=this.velY; // incremental de la coordenada en base a la velocidad
};

// Función para crear 25 pelotas de propiedades aleatorias

let balls = []; // creamos un array vacío

while(balls.length < 25) {
    const size = random(10,20); //tamaño aleatorio entre 10 y 20. Se define anterior al while, ya que se necesita el valor en el while para calcular X e Y. 
    let ball = new Ball(


        random(0 + size,width - size), // el número aleatorio comprendido entre los limites del area de dibujo menos el radio para que la pelota no se salga
        random(0 + size,height - size),
        random (-7, 7), // velocidad aleatoria entre -7 y 7
        random(-7, 7),
        'rgb(' + random(0, 255) + ',' + random(0,255) + ','+ random(0, 255) + ')', //color aleatorio
        size // usa el tamaño definido previamente
        );
    balls.push(ball); // agregamos el nuevo objeto almacenado en ball a la matriz mediante el método push    
}

// Función que dibuja las pelotas en base a los datos almacenados en la matriz "balls", y que va "apagando" u "opacando" las renderizaciones de los frames previos generando un efecto de movimiento dinámico de la pelota. 

function loop() {
    ctx.fillStyle = 'rgba (0,0,0,0.25)'; // 25% de opacidad 
    ctx.fillRect (0, 0, width, height); // aplicado a un rectángulo superpuesto al canvas
    
    for (let i = 0; i < balls.length; i++) {  // luego de opacar al frame anterior renderiza las pelotas si correspondiese, actualiza las posiciones y por lo tanto genera el nuevo frame
        balls[i].draw();
        balls[i].update(); 
    }
    requestAnimationFrame(loop); // método que llama a la misma función en la que se encuentra, lo cual genera un búcle infinito con una frecuencia determinada
}
loop(); //hay que invocar a la función para que inicie, ya luego sigue sola