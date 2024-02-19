import {config} from './config';
import mysql from 'mysql2/promise';

//creamos y devolvemos una coneccion a db

export const connect = async ()=>{
   return await mysql.createConnection(config);
};
/*
// prueba de coneccion

const connect = async () => {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.query('SELECT 1 + 1');
    console.log(rows);

}
connect();


*/