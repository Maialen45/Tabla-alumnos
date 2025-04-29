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

    resumen() {
        return `El alumno ${this.nombre} ${this.apellido} con DNI ${this.dni} tiene ${this.edad} años y está en el curso ${this.curso}`;
    }
}
