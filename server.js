const express = require('express');
const mssql = require('mssql');

const app = express();

// Configurar la conexión a la base de datos MSSQL
const config = {
    server: 'JOSA-LAPTOP',
    database: 'TAREA0',
    user: 'josa',
    password: '1234',
    options: {
        encrypt: true,
        trustServerCertificate: true // Agregar esta opción para confiar en el certificado autofirmado
    }
        
};

app.get('/data', async (req, res) => {
    try {
        // Establecer la conexión a la base de datos
        await mssql.connect(config);

        // Realizar una consulta a la base de datos
        const result = await mssql.query('SELECT * FROM dbo.Empleados');

        // Enviar los datos como respuesta al frontend
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    } finally {
        // Cerrar la conexión a la base de datos
        await mssql.close();
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});