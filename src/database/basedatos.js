const mysql = require('mysql');
const { promisify } = require('util');
require('dotenv').config();


const {database} = require('./llaves');
const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('BD SESIÓN CERRADA');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('BD HA TENIDO DEMASIADAS CONEXIONES');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('BD CONEXIÓN RECHAZADA');
        }
    }
    if(connection) connection.release();
    console.log('BD conectada');
    return;
});
pool.query = promisify(pool.query); //permite promisify, importante para database
module.exports = pool;

