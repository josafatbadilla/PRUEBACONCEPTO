
function abrirVentana() {
    var ventana = window.open('newEmployee.html', '_blank', 'width=600,height=400');
    setTimeout(function() {
        window.close(); // Cerrar la ventana principal después de un retraso
    }, 100);
}

function cargarDatos() {
    fetch('http://localhost:3000/data')
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById('datosTabla');
            tabla.innerHTML = ''; // Limpiar tabla antes de agregar nuevos datos
            
            data.forEach(fila => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    
                    <td>${fila.Nombre}</td>
                    <td>${fila.Salario}</td>
                `;
                tabla.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });   
   
}


window.onload = cargarDatos;

