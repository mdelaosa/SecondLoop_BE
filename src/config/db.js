import { createPool } from "mysql2/promise";

const pool = createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME
});

// Comprobación rápida al arrancar el servidor para verificar que MySQL responde
try {
    const connection = await pool.getConnection();
    console.log('✅ Conectado exitosamente a MySQL (second_loop_db)');
    connection.release();
} catch (error) {
    console.error('❌ Error al conectar con MySQL:', error.message);
}


export default pool;