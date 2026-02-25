import { pool } from '$lib/server/db';

export async function load() {
	try {
		const result = await pool.query('SELECT NOW()');

		console.log('Conectado desde SvelteKit:', result.rows);

		return {
			fecha: result.rows[0].now
		};
	} catch (error) {
		console.error('Error real:', error);

		return {
			fecha: 'Error de conexión'
		};
	}
}