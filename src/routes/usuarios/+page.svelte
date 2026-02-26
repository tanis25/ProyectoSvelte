<script lang="ts">
	export let data;

	let search = data.filtros.search;
	let desde = data.filtros.desde;
	let hasta = data.filtros.hasta;

	let showCreate = false;
	let showEdit = false;
	let editUser: any = null;

	let nombreError = '';
	let paternoError = '';
	let maternoError = '';

	function openEdit(user: any) {
		editUser = user;
		showEdit = true;
		nombreError = '';
		paternoError = '';
		maternoError = '';
	}

	function limpiar() {
		window.location.href = '/usuarios';
	}

	function soloLetras(texto: string): boolean {
		const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
		return regex.test(texto);
	}

	function validarNombre(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!soloLetras(input.value) && input.value !== '') {
			nombreError = 'Solo se permiten letras';
			input.setCustomValidity('Solo se permiten letras');
		} else {
			nombreError = '';
			input.setCustomValidity('');
		}
	}

	function validarPaterno(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!soloLetras(input.value) && input.value !== '') {
			paternoError = 'Solo se permiten letras';
			input.setCustomValidity('Solo se permiten letras');
		} else {
			paternoError = '';
			input.setCustomValidity('');
		}
	}

	function validarMaterno(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!soloLetras(input.value) && input.value !== '') {
			maternoError = 'Solo se permiten letras';
			input.setCustomValidity('Solo se permiten letras');
		} else {
			maternoError = '';
			input.setCustomValidity('');
		}
	}

	function abrirCrear() {
		showCreate = true;
		nombreError = '';
		paternoError = '';
		maternoError = '';
	}
</script>

<style>
	.container {
		padding: 40px;
		font-family: 'Segoe UI', sans-serif;
		background: #f4f6f9;
		min-height: 100vh;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th {
		background: #930b54;
		color: white;
		padding: 12px;
	}

	td {
		padding: 10px;
		border-bottom: 1px solid #eee;
	}

	.paginacion {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 15px;
		margin-top: 25px;
	}

	.flecha {
		background: #7B1E3A;
		color: white;
		padding: 10px 14px;
		border-radius: 8px;
		text-decoration: none;
		font-weight: bold;
	}

	.flecha:hover {
		background: #5e162b;
	}

	.disabled {
		pointer-events: none;
		opacity: 0.4;
	}

	.page-info {
		font-weight: bold;
		font-size: 16px;
	}
</style>

<div class="container">

	<a href="/" style="text-decoration:none; background:#2c3e50; color:white; padding:10px 16px; border-radius:8px;">
		Volver al inicio
	</a>

	<h2>Gestión de Usuarios</h2>

	<!-- TABLA SIN ID -->
	<table>
		<thead>
			<tr>
				<th>Nombre</th>
				<th>Apellido P</th>
				<th>Apellido M</th>
				<th>Fecha</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			{#each data.usuarios as u}
				<tr>
					<td>{u.nombre}</td>
					<td>{u.apellido_paterno}</td>
					<td>{u.apellido_materno}</td>
					<td>{u.fecha_nacimiento}</td>
					<td>
						<button on:click={() => openEdit(u)}>Editar</button>

						<form method="POST" style="display:inline">
							<input type="hidden" name="id" value={u.id} />
							<button formaction="?/eliminar">Eliminar</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<!-- NUEVA PAGINACIÓN SOLO CON FLECHAS -->
	{#if data.totalPages > 0}
		<div class="paginacion">

			<!-- INICIO -->
			<a
				class="flecha {data.page <= 1 ? 'disabled' : ''}"
				href="?page=1&search={search}&desde={desde}&hasta={hasta}"
			>
				⏮
			</a>

			<!-- ANTERIOR -->
			<a
				class="flecha {data.page <= 1 ? 'disabled' : ''}"
				href="?page={data.page - 1}&search={search}&desde={desde}&hasta={hasta}"
			>
				⬅
			</a>

			<!-- INFO CENTRAL -->
			<div class="page-info">
				Página {data.page} de {data.totalPages}
			</div>

			<!-- SIGUIENTE -->
			<a
				class="flecha {data.page >= data.totalPages ? 'disabled' : ''}"
				href="?page={data.page + 1}&search={search}&desde={desde}&hasta={hasta}"
			>
				➡
			</a>

			<!-- FIN -->
			<a
				class="flecha {data.page >= data.totalPages ? 'disabled' : ''}"
				href="?page={data.totalPages}&search={search}&desde={desde}&hasta={hasta}"
			>
				⏭
			</a>

		</div>
	{/if}

</div>