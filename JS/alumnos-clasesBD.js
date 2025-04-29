function consulta(callback) {
    let listaAlumnos = JSON.parse(localStorage.getItem("listaAlumnos")) || [];
    callback(listaAlumnos); // Ejecutamos el callback con los resultados
}

function baseDatos(callback) {
    console.log("Petición recibida ");
    setTimeout(() => {
        consulta((listaAlumnos) => {
            console.log("Consulta completada:", listaAlumnos);
            callback(listaAlumnos); // Pasamos los resultados al callback
        });
    }, 2000);
}

//Con promesas:
/*export const baseDatos = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let listaAlumnos =
                JSON.parse(localStorage.getItem("listaAlumnos")) || [];
            resolve(listaAlumnos);
            if (typeof listaAlumnos === 'undefined') {
                reject("Error al cargar los datos");
            }
        }, 5000);
    });
};*/
