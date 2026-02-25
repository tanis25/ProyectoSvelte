import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'mi_proyecto',
	password: '1234',
	port: 5432
});

pool.query('SELECT NOW()')
	.then(res => {
		console.log('Conectado:', res.rows);
		process.exit();
	})
	.catch(err => {
		console.error('Error real:', err);
		process.exit();
	});