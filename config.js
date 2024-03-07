const mssql = require('mssql');

const config = {
    server: 'JOSA-LAPTOP',
    database: 'TAREA0',
    options: {
        encrypt: true, // Habilitar el cifrado SSL
        trustServerCertificate: true // Desactivar la verificación del certificado
    }
        
};

async function executeQuery() {
    try {
        // Conectarse a la base de datos
        await mssql.connect(config);

        // Consulta SQL
        const result = await mssql.query('SELECT * FROM dbo.Empleado');

        // Imprimir resultados
        console.dir(result);

    } catch (err) {
        // Manejar errores
        console.error('Error al ejecutar la consulta:', err);
    } finally {
        // Cerrar la conexión
        await mssql.close();
    }
}

// Llamar a la función para ejecutar la consulta
executeQuery();

// Función para cargar los datos de la tabla desde la API
function cargarDatos() {
    fetch('url_de_tu_api_que_proporciona_los_datos')
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
// Llamar a la función para cargar los datos cuando la página cargue
//window.onload = cargarDatos;