import pkg from 'pg';
import { env } from '$env/dynamic/private';

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/* =========================
   GALERIA
========================= */

export async function saveImage(
  nombre: string,
  tipo: string,
  buffer: Buffer
) {
  await pool.query(
    'INSERT INTO galeria (nombre, tipo, imagen) VALUES ($1, $2, $3)',
    [nombre, tipo, buffer]
  );
}

export async function getImages() {
  const result = await pool.query(
    "SELECT id, nombre, tipo, encode(imagen, 'base64') as imagen FROM galeria ORDER BY id DESC"
  );
  return result.rows;
}

export async function deleteImage(id: number) {
  await pool.query(
    'DELETE FROM galeria WHERE id = $1',
    [id]
  );
}

// OBTENER USUARIOS CON FILTROS Y PAGINADO
export interface Usuario {
	id: number;
	nombre: string;
	apellido_paterno: string;
	apellido_materno: string;
	fecha_nacimiento: string;
	password: string;
	created_at: string;
}

export async function getUsuarios(
	page: number,
	limit: number,
	search: string,
	desde: string,
	hasta: string
) {
	const offset = (page - 1) * limit;

	let values: any[] = [];
	let conditions: string[] = [];
	let index = 1;

	if (search) {
		conditions.push(`(
			LOWER(nombre) LIKE LOWER($${index})
			OR LOWER(apellido_paterno) LIKE LOWER($${index})
			OR LOWER(apellido_materno) LIKE LOWER($${index})
		)`);
		values.push(`%${search}%`);
		index++;
	}

	if (desde) {
		conditions.push(`fecha_nacimiento >= $${index}`);
		values.push(desde);
		index++;
	}

	if (hasta) {
		conditions.push(`fecha_nacimiento <= $${index}`);
		values.push(hasta);
		index++;
	}

	const where = conditions.length
		? `WHERE ${conditions.join(' AND ')}`
		: '';

	const dataQuery = `
		SELECT id, nombre, apellido_paterno, apellido_materno,
		       fecha_nacimiento::text, created_at
		FROM usuarios
		${where}
		ORDER BY id DESC
		LIMIT $${index} OFFSET $${index + 1}
	`;

	const countQuery = `
		SELECT COUNT(*) FROM usuarios ${where}
	`;

	const data = await pool.query(dataQuery, [...values, limit, offset]);
	const count = await pool.query(countQuery, values);

	return {
		usuarios: data.rows,
		total: Number(count.rows[0].count)
	};
}

export async function crearUsuario(data: {
	nombre: string;
	apellido_paterno: string;
	apellido_materno: string;
	fecha_nacimiento: string;
	password: string;
}) {
	await pool.query(
		`INSERT INTO usuarios
		(nombre, apellido_paterno, apellido_materno, fecha_nacimiento, password)
		VALUES ($1,$2,$3,$4,$5)`,
		[
			data.nombre,
			data.apellido_paterno,
			data.apellido_materno,
			data.fecha_nacimiento,
			data.password
		]
	);
}

export async function eliminarUsuario(id: number) {
	await pool.query(`DELETE FROM usuarios WHERE id=$1`, [id]);
}