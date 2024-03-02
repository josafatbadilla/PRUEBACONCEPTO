var Connection = require('tedious').Connection;  
    var config = {  
        server: 'JOSA-LAPTOP',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'your_username', //update me
                password: 'your_password'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'TAREA0'  //update me
        }
    };  
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.
        console.log("Connected");  
        test();
    });
    
    connection.connect();

    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;  
  
    function test (){
    const request = new Request("SELECT * FROM dbo.Empleados;", function(err, rowCount) {
        console.log(rowCount + ' row(s) returned');
      });
    
      connection.execSql(request);
    }