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

	.card {
		background: white;
		padding: 20px;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0,0,0,0.08);
		margin-bottom: 20px;
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

	button {
		padding: 6px 12px;
		border-radius: 6px;
		border: none;
		cursor: pointer;
		font-weight: 500;
	}

	.primary { background: #7B1E3A; color: white; }
	.warning { background: #7B1E3A; color: white; }
	.danger { background: #cc0505; color: white; }
	.gray { background: #6b7280; color: white; }

	.modal {
		position: fixed;
		inset: 0;
		background: rgba(0,0,0,0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal-box {
		background: white;
		padding: 25px;
		border-radius: 10px;
		width: 400px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.paginacion {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		margin-top: 20px;
	}

	.paginacion a, .paginacion span {
		padding: 8px 12px;
		background: white;
		border: 1px solid #ddd;
		border-radius: 6px;
		text-decoration: none;
		color: #333;
		font-weight: 500;
		display: inline-block;
	}

	.paginacion a.disabled {
		pointer-events: none;
		opacity: 0.5;
	}

	.inicio-btn {
		display: inline-block;
		margin-bottom: 20px;
		background: #2c3e50;
		color: white;
		padding: 10px 16px;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 500;
	}

	.inicio-btn:hover {
		background: #1a252f;
	}
</style>

<div class="container">

	<a href="/" class="inicio-btn"> Volver al inicio</a>

	<h2>Gestión de Usuarios</h2>

	<div style="margin-bottom: 20px;">
		<button class="btn-crear" on:click={abrirCrear}>
			+ Crear Usuario
		</button>
	</div>

	<div class="card">
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
							<button class="warning" on:click={() => openEdit(u)}>
								Editar
							</button>

							<form method="POST" style="display:inline">
								<input type="hidden" name="id" value={u.id} />
								<button class="danger" formaction="?/eliminar">
									Eliminar
								</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if data.totalPages > 0}
		<div class="paginacion">

			<a href="?page=1&search={search}&desde={desde}&hasta={hasta}" class={data.page <= 1 ? 'disabled' : ''}>⏮</a>

			<a href="?page={data.page - 1}&search={search}&desde={desde}&hasta={hasta}" class={data.page <= 1 ? 'disabled' : ''}>⬅</a>

			<span>Página {data.page} de {data.totalPages}</span>

			<a href="?page={data.page + 1}&search={search}&desde={desde}&hasta={hasta}" class={data.page >= data.totalPages ? 'disabled' : ''}>➡</a>

			<a href="?page={data.totalPages}&search={search}&desde={desde}&hasta={hasta}" class={data.page >= data.totalPages ? 'disabled' : ''}>⏭</a>

		</div>
	{/if}

</div>
{#if showCreate}
	<div class="modal">
		<div class="modal-box moderno">
			<h3>Crear Usuario</h3>
			<form method="POST">
				<input 
					name="nombre" 
					placeholder="Nombre" 
					required 
					on:input={validarNombre}
					class:error={!!nombreError}
				/>
				{#if nombreError}
					<div class="error-mensaje">{nombreError}</div>
				{/if}

				<input 
					name="apellido_paterno" 
					placeholder="Apellido Paterno" 
					required 
					on:input={validarPaterno}
					class:error={!!paternoError}
				/>
				{#if paternoError}
					<div class="error-mensaje">{paternoError}</div>
				{/if}

				<input 
					name="apellido_materno" 
					placeholder="Apellido Materno" 
					required 
					on:input={validarMaterno}
					class:error={!!maternoError}
				/>
				{#if maternoError}
					<div class="error-mensaje">{maternoError}</div>
				{/if}

				<input type="date" name="fecha_nacimiento" required />
				<input type="password" name="password" placeholder="Contraseña" required />
				
				<div class="botones">
					<button 
						class="primary" 
						formaction="?/crear"
						disabled={!!nombreError || !!paternoError || !!maternoError}
					>
						Guardar
					</button>
					<button class="cancelar" type="button" on:click={() => showCreate = false}>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

{#if showEdit}
	<div class="modal">
		<div class="modal-box moderno">
			<h3>Editar Usuario</h3>
			<form method="POST">
				<input type="hidden" name="id" value={editUser.id} />
				
				<input 
					name="nombre" 
					placeholder="Nombre" 
					value={editUser.nombre} 
					required 
					on:input={validarNombre}
					class:error={!!nombreError}
				/>
				{#if nombreError}
					<div class="error-mensaje">{nombreError}</div>
				{/if}

				<input 
					name="apellido_paterno" 
					placeholder="Apellido Paterno" 
					value={editUser.apellido_paterno} 
					required 
					on:input={validarPaterno}
					class:error={!!paternoError}
				/>
				{#if paternoError}
					<div class="error-mensaje">{paternoError}</div>
				{/if}

				<input 
					name="apellido_materno" 
					placeholder="Apellido Materno" 
					value={editUser.apellido_materno} 
					required 
					on:input={validarMaterno}
					class:error={!!maternoError}
				/>
				{#if maternoError}
					<div class="error-mensaje">{maternoError}</div>
				{/if}

				<input type="date" name="fecha_nacimiento" value={editUser.fecha_nacimiento} required />
				
				<div class="botones">
					<button 
						class="warning" 
						formaction="?/editar"
						disabled={!!nombreError || !!paternoError || !!maternoError}
					>
						Actualizar
					</button>
					<button class="cancelar" type="button" on:click={() => showEdit = false}>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
