class Alumno {
    constructor(nombre, apellido, dni, edad, curso) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = Alumno.validarDni(dni);
        this.edad = Alumno.validarEdad(edad);
        this.curso = curso;
    }

    static validarDni(dni) {
        const dniExp = new RegExp("^\\d{8}[A-Z]{1}$");
        // const expresion = /^\d{8}[A-Z]$/
        if (!dniExp.test(dni)) {
            throw new Error("El DNI debe contener 8 números y 1 letra");
        } else {
            return dni;
        }
    }

    static validarEdad(edad) {
        parseInt(edad);
        if (edad > 18 || edad < 0) {
            throw new Error("La edad tiene que estar entre 0 y 18 años");
        } else {
            return edad;
        }
    }

    static cursos = ["1º", "2º", "3º", "4º", "5º"];

    static getCursos() {
        return Alumno.cursos;
    }

    notificacion(mensaje, cancelar = "") {
        return new Promise((resolve) => {
            let notificacion = document.createElement("div");
            notificacion.className = "notificacion";
            notificacion.innerHTML = `<p>${mensaje}</p>
                <div class= 'notificacion-botones'><button id="botonAceptar">Aceptar</button>${cancelar}</div>
            `;
            document.body.appendChild(notificacion);

            const botonAceptar = document.getElementById("botonAceptar");
            botonAceptar.onclick = function () {
                notificacion.remove();
                resolve(true);
            };
            const botonCancelar = document.getElementById("botonCancelar");
            botonCancelar.onclick = function () {
                notificacion.remove();
                resolve(false);
            };
        });
    }
}
