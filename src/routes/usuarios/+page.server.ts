import type { PageServerLoad, Actions } from './$types';
import { getUsuarios, crearUsuario, eliminarUsuario, pool } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const page = Number(url.searchParams.get('page') ?? 1);
	const search = url.searchParams.get('search') ?? '';
	const desde = url.searchParams.get('desde') ?? '';
	const hasta = url.searchParams.get('hasta') ?? '';

	const limit = 5;

	const { usuarios, total } = await getUsuarios(
		page,
		limit,
		search,
		desde,
		hasta
	);

	return {
		usuarios,
		page,
		totalPages: Math.ceil(total / limit),
		filtros: { search, desde, hasta }
	};
};

export const actions: Actions = {
	crear: async ({ request }) => {
		const form = await request.formData();

		await crearUsuario({
			nombre: form.get('nombre') as string,
			apellido_paterno: form.get('apellido_paterno') as string,
			apellido_materno: form.get('apellido_materno') as string,
			fecha_nacimiento: form.get('fecha_nacimiento') as string,
			password: form.get('password') as string
		});

		throw redirect(303, '/usuarios');
	},

	editar: async ({ request }) => {
		const form = await request.formData();

		await pool.query(
			`UPDATE usuarios
			 SET nombre=$1,
			     apellido_paterno=$2,
			     apellido_materno=$3,
			     fecha_nacimiento=$4
			 WHERE id=$5`,
			[
				form.get('nombre'),
				form.get('apellido_paterno'),
				form.get('apellido_materno'),
				form.get('fecha_nacimiento'),
				form.get('id')
			]
		);

		throw redirect(303, '/usuarios');
	},

	eliminar: async ({ request }) => {
		const form = await request.formData();
		await eliminarUsuario(Number(form.get('id')));
		throw redirect(303, '/usuarios');
	}
};