

function iniciarApp() {
    try {
        // Establecer la conexión a la base de datos
        sql.connect(config);
        console.log('Conexión establecida correctamente');
        // Llamar a la función para cargar los datos después de establecer la conexión
        cargarDatos();
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    } 
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
                    <td>${fila.id}</td>
                    <td>${fila.nombre}</td>
                    <td>${fila.salario}</td>
                `;
                tabla.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });   
   
}

cargarDatos();
//window.onload = cargarDatos;

/*fetch('url_de_tu_api_que_proporciona_los_datos')
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById('datosTabla');
            tabla.innerHTML = ''; // Limpiar tabla antes de agregar nuevos datos
            
            data.forEach(fila => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${fila.id}</td>
                    <td>${fila.nombre}</td>
                    <td>${fila.salario}</td>
                `;
                tabla.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });*/