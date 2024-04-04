function sonSoloLetras(str) {
    // Comprueba si el string contiene solo letras del alfabeto (mayúsculas o minúsculas)
    return /^[a-zA-ZÁáÉéÍíÓóÚúÑñÜü]+(\s[a-zA-ZÁáÉéÍíÓóÚúÑñÜü]+)?$/.test(str);
  }

function insertarDatos(nombre, salario) {
    //Inserta los datos en la base de datos
    
    if(!sonSoloLetras(nombre)){ //Valida si son solo letras
        alert('Debe ingresar un nombre válido');
    }
    else if(salario<=0){ //Valida si el salario e mayor a ceo
        alert('El salario debe ser un valor mayor a 0');
    }
    else{
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
            if (data.resultCode == 50006){ //Captura el codigo de error
                alert('El empleado ya se encuentra registrado');
            } else{
                console.log(data.message);
                cerrarVentana();
            } 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function cerrarVentana() {
    var ventana = window.open('page.html', '_blank');
    setTimeout(function() {
        window.close(); // Cerrar la ventana principal después de un retraso
    }, 100);
}



document.getElementById('formularioEmpleados').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente

    // Obtener los valores de los campos de entrada
    const nombre = document.getElementById('nombre').value;
    const salario = document.getElementById('salario').value;

    // Llamar a la función insertarDatos con los datos del formulario
    insertarDatos(nombre, salario);
});

