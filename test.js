const mssql = require('mssql');

const config = {
    server: 'JOSA-LAPTOP',
    database: 'TAREA0',
    options: {
        encrypt: true, 
        trustServerCertificate: true 
    }
        
};

async function executeQuery() {
    try {
        // Conectarse a la base de datos
        await mssql.connect(config);

        const result = await mssql.query('SELECT * FROM dbo.Empleado');
        console.dir(result);

    } catch (err) {
        console.error('Error al ejecutar la consulta:', err);
    } finally {
        // Cerrar la conexión
        await mssql.close();
    }
}

executeQuery();
