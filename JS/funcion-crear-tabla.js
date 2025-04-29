let listaAlumnos = JSON.parse(localStorage.getItem("listaAlumnos")) || [];
listaAlumnos = listaAlumnos.map(
    (a) => new Alumno(a.nombre, a.apellido, a.dni, a.edad, a.curso)
);

function introducirDatos() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni =
        //Las validaciones las traigo de alumnos.js con el Alumno.(nombre de la función)
        document.getElementById("dni").value;
    let edad = document.getElementById("edad").value;
    let curso = document.getElementById("curso").value;
    try {
        let alumno = new Alumno(nombre, apellido, dni, edad, curso);
        console.log(listaAlumnos);
        listaAlumnos.push(alumno);
        localStorage.setItem("listaAlumnos", JSON.stringify(listaAlumnos));
    } catch (error) {
        //Aqui capturamos el error, por lo que ya no sale en la consola
        alert(error.message);
    }
    inputCleaner("nombre");
    inputCleaner("apellido");
    inputCleaner("dni");
    inputCleaner("edad");
    inputCleaner("curso");
}

function crearEncabezado() {
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";
    let encabezado = document.createElement("thead");
    let claves = Object.keys(listaAlumnos[0]);
    claves.forEach((clave) => {
        let celdas = document.createElement("th");
        celdas.innerHTML = clave.charAt(0).toUpperCase() + clave.slice(1);
        encabezado.appendChild(celdas);
    });
    let columnaResumen = document.createElement("th");
    columnaResumen.innerHTML = "Obtener resumen";
    encabezado.appendChild(columnaResumen);
    let columnaBorrar = document.createElement("th");
    columnaBorrar.innerHTML = "Borrar";
    encabezado.appendChild(columnaBorrar);
    tabla.appendChild(encabezado);
}

function crearCuerpo() {
    let tabla = document.getElementById("tabla");
    let cuerpo = document.createElement("tbody");
    listaAlumnos.forEach((alumno, indice) => {
        let fila = document.createElement("tr");
        fila.setAttribute("class", "filas");
        let valores = Object.values(alumno);
        valores.forEach((valor) => {
            let celdas = document.createElement("td");
            celdas.innerHTML = valor;
            fila.appendChild(celdas);
        });
        //Creo el botón para el resumen
        let celdaBotonResumen = document.createElement("td");
        let botonResumen = document.createElement("button");
        botonResumen.innerHTML = "Resumen";
        botonResumen.id = "boton-resumen";
        botonResumen.addEventListener("click", () => {
            alumno.notificacion(
                `${alumno.nombre} ${alumno.apellido} con DNI ${alumno.dni} tiene ${alumno.edad} años y está en ${alumno.curso} curso`
            );
        });
        celdaBotonResumen.appendChild(botonResumen);
        fila.appendChild(celdaBotonResumen);

        //Creo el botón para borrar
        let celdaBotonBorrar = document.createElement("td");
        let botonBorrar = document.createElement("button");
        botonBorrar.innerHTML = "Eliminar";
        botonBorrar.id = "boton-borrar";
        botonBorrar.addEventListener("click", () => {
            alumno
                .notificacion(
                    `¿Deseas borrar los datos de ${alumno.nombre} ${alumno.apellido}?`,
                    "<button id='botonCancelar'>Cancelar</button>"
                )
                .then((respuesta) => {
                    if (respuesta) {
                        listaAlumnos.splice(indice, 1);
                        localStorage.setItem(
                            "listaAlumnos",
                            JSON.stringify(listaAlumnos)
                        );
                        crearTabla();
                    }
                });
        });
        celdaBotonBorrar.appendChild(botonBorrar);
        fila.appendChild(celdaBotonBorrar);

        cuerpo.appendChild(fila);
        tabla.appendChild(cuerpo);
    });
}

const crearTabla = function () {
    let tabla = document.getElementById("tabla");
    console.log(listaAlumnos);
    if (listaAlumnos.length === 0) {
        tabla.innerHTML =
            "<tr><td colspan='5'>No hay alumnos registrados</td></tr>";
    } else {
        crearEncabezado();
        crearCuerpo();
    }
};

function inputCleaner(id) {
    let input = document.getElementById(id);
    input.value = "";
}

function crearSelector(id, opciones) {
    //El id es el id del objeto y las opciones son 1º, 2º...
    let selector = document.getElementById(id);
    opciones.forEach((opcion) => {
        let opcionElemento = document.createElement("option");
        opcionElemento.setAttribute("value", opcion);
        opcionElemento.innerHTML = opcion;
        selector.appendChild(opcionElemento);
    });
}
const cursos = Alumno.getCursos();
crearSelector("curso", cursos);

document
    .getElementById("introducirDatos")
    .addEventListener("click", introducirDatos);
document.getElementById("crearTabla").addEventListener("click", () => {
    baseDatos(crearTabla);
    document.getElementById("tabla").innerText = "Cargando datos...";
});
