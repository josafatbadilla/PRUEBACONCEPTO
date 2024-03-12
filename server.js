const express = require('express');
const mssql = require('mssql');
const cors = require('cors');
const app = express();

app.use(cors());


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

async function conectarBaseDatos() {
    try {
        await mssql.connect(config);
        console.log('Conexión establecida con la base de datos');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
}


app.get('/data', async (req, res) => {
    try {

        // Realizar una consulta a la base de datos
        const result = await mssql.query('EXEC dbo.ListarEmpleado');

        // Enviar los datos como respuesta al frontend
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    } 
});

app.post('/insertarDatos', async (req, res) => {
    try {
        const { nombre, salario } = req.body;

        // Crear una instancia de Request
        const request = new mssql.Request();

        // Establecer los parámetros de entrada
        request.input('inNombre', mssql.VarChar(64), nombre);
        request.input('inSalario', mssql.Money, salario);

        // Definir el parámetro de salida
        request.output('OutResultCode', mssql.Int);

        // Ejecutar el procedimiento almacenado
        await request.execute('dbo.InsertarEmpleado');

        // Obtener el valor del parámetro de salida
        const resultCode = request.parameters.OutResultCode.value;

        // Enviar una respuesta al cliente
        res.status(200).json({ message: 'Datos insertados correctamente', resultCode: resultCode });
    } catch (error) {
        console.error('Error al insertar datos:', error);
        res.status(500).json({ error: 'Error al insertar datos' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

conectarBaseDatos();