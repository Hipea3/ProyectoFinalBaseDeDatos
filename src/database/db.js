const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'rollerdreams',
    port: '3306'
})

connection.connect((error)=>{
    if(error){
        console.log('El error es : '+error);
        return;
    }
    console.log('Conectado a la base de datos');

});
module.exports = connection;