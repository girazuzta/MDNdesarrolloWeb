//DEFINICIÓN DE UN OBJETO SOLO: 
const objPersona = {
    nombre: ["Gaston", "Irazuzta"],
    edad: 31,
    género: "masculino",
    intereses: ["pesca", "windsurf"],
    bio: function () {
        alert (this.nombre[0]+" "+this.name+" tiene "+this.edad+". Le interesa "+this.intereses[0]+" y "+this.inteeses[1])
    },
};

// DEFINICION DEL CONSTRUCTOR PARA GENERAR INSTANCIAS DEL OBJETO PERSONA: 
function Persona (nombre, apellido, edad, género, hobby) {
    this.nombreYapellido = {
        nombre: nombre,
        apellido: apellido,
    };
    this.edad = edad;
    this.género = género;
    this.hobby = hobby;
    this.bio = function () {
        alert (this.nombreYapellido.nombre+" "+this.nombreYapellido.apellido+" tiene "+this.edad+" años. Le interesa "+this.hobby+".")
    };
    this.saludo = function () {
        alert("Hola! Soy "+this.nombreYapellido.nombre+".")
    };
}
// INSTANCIACIÓN: 
let usuario1 = new Persona("Gaston", "Irazuzta", 31, "masculino", "pesca");
