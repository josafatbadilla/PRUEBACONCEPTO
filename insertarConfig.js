
function insertarDatos(nombre, salario) {
  
    const datos = { nombre: nombre, salario: salario };
    fetch('http://localhost:3000/insertarDatos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error aquí');
        }
    })
    .then(data => {
        console.log(data.message); // Mensaje de éxito devuelto por la función insertarDatos
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


document.getElementById('formularioEmpleados').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente

    // Obtener los valores de los campos de entrada
    const nombre = document.getElementById('nombre').value;
    const salario = document.getElementById('salario').value;

    // Llamar a la función insertarDatos con los datos del formulario
    insertarDatos(nombre, salario);
});

