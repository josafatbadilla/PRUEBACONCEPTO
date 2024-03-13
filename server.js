const express = require('express');
const mssql = require('mssql');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

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
        const request = new mssql.Request();
        
        //Parametro de salida
        request.output('OutResultCode', mssql.Int);

        request.execute('dbo.ListarEmpleado', (err, result) => {
            if (err) {
              console.error('Error al ejecutar el procedimiento almacenado:', err);
              return;
            }
            // Obtener el valor de salida
            const resultCode = result.output.OutResultCode;
            
            // Envia el codigo de resultado
            res.json(result.recordset)
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    } 
});

app.post('/insertarDatos', async (req, res) => {
    try {
        const { nombre, salario } = req.body;
        const request = new mssql.Request();

        // Establece los parámetros de entrada y salida
        request.input('inNombre', mssql.VarChar(64), nombre);
        request.input('inSalario', mssql.Money, salario);
        request.output('OutResultCode', mssql.Int);
        
        // Ejecutar el procedimiento almacenado
        request.execute('dbo.InsertarEmpleado', (err, result) => {
            if (err) {
              console.error('Error al ejecutar el procedimiento almacenado:', err);
              return;
            }
            // Obtener el valor de salida
            const resultCode = result.output.OutResultCode;
            // Envia un mensaje y el codigo de resultado
            res.status(200).json({ message: 'Datos insertados correctamente', resultCode: resultCode });
        });
        
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