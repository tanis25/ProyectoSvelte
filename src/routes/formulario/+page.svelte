<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	interface Registro {
		id: number;
		nombre: string;
		email: string;
		edad: number;
		telefono: string;
	}

	let nombre = '';
	let email = '';
	let telefono = '';
	let fecha = '';

	let registros: Registro[] = [];
	let contador = 1;

	let errorNombre = '';
	let errorEmail = '';
	let errorTelefono = '';
	let errorFecha = '';

	/* ===============================
	   🔥 CARGAR LOCALSTORAGE
	================================ */
	onMount(() => {
		const datos = localStorage.getItem('registros');
		if (datos) {
			registros = JSON.parse(datos);
			contador =
				registros.length > 0
					? Math.max(...registros.map((r) => r.id)) + 1
					: 1;
		}
	});

	function guardarDatos() {
		localStorage.setItem('registros', JSON.stringify(registros));
	}

	/* ===============================
	   🔥 BLOQUEOS REALES DE INPUT
	================================ */

	// 🔒 SOLO LETRAS (Nombre)
	function manejarNombre(e: Event) {
		const input = e.target as HTMLInputElement;
		input.value = input.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
		if (input.value.length > 50) {
			input.value = input.value.slice(0, 50);
		}
		nombre = input.value;
	}

	// 🔒 SOLO NÚMEROS (Teléfono)
	function manejarTelefono(e: Event) {
		const input = e.target as HTMLInputElement;
		input.value = input.value.replace(/[^0-9]/g, '');
		if (input.value.length > 10) {
			input.value = input.value.slice(0, 10);
		}
		telefono = input.value;
	}

	function calcularEdad(fechaNacimiento: string): number {
		const hoy = new Date();
		const nacimiento = new Date(fechaNacimiento);
		let edad = hoy.getFullYear() - nacimiento.getFullYear();
		const m = hoy.getMonth() - nacimiento.getMonth();

		if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
			edad--;
		}
		return edad;
	}

	function validar() {
		let valido = true;

		errorNombre = '';
		errorEmail = '';
		errorTelefono = '';
		errorFecha = '';

		// ✅ Nombre obligatorio
		if (nombre.length === 0) {
			errorNombre = 'El nombre es obligatorio';
			valido = false;
		}

		// ✅ Email
		if (email.length === 0) {
			errorEmail = 'El correo es obligatorio';
			valido = false;
		} else if (email.length > 100) {
			errorEmail = 'Máximo 100 caracteres';
			valido = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errorEmail = 'Formato de correo inválido';
			valido = false;
		}

		// ✅ Teléfono
		if (telefono.length !== 10) {
			errorTelefono = 'Debe tener exactamente 10 números';
			valido = false;
		} else if (/^(\d)\1+$/.test(telefono)) {
			errorTelefono = 'No puede tener todos los números iguales';
			valido = false;
		}

		// ✅ Fecha
		if (!fecha) {
			errorFecha = 'Selecciona tu fecha';
			valido = false;
		} else {
			const edad = calcularEdad(fecha);
			if (edad < 18 || edad > 100) {
				errorFecha = 'Debes tener entre 18 y 100 años';
				valido = false;
			}
		}

		return valido;
	}

	function enviarFormulario() {
		if (!validar()) return;

		const edad = calcularEdad(fecha);

		registros = [
			...registros,
			{
				id: contador++,
				nombre,
				email,
				edad,
				telefono
			}
		];

		guardarDatos();

		nombre = '';
		email = '';
		telefono = '';
		fecha = '';
	}

	function eliminar(id: number) {
		registros = registros.filter((r) => r.id !== id);
		guardarDatos();
	}

	function volverInicio() {
		goto('/');
	}
</script>

<div class="contenedor">
	<div class="card">
		<h1>Formulario de Contacto</h1>

		<div class="campo">
			<label for="nombre">Nombre completo</label>
			<input
				id="nombre"
				type="text"
				value={nombre}
				on:input={manejarNombre}
				maxlength="50"
				placeholder="Ej. Juan Pérez"
				class:error-input={!!errorNombre}
			/>
			{#if errorNombre}
				<span class="error">{errorNombre}</span>
			{/if}
		</div>

		<div class="campo">
			<label for="email">Correo electrónico</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				maxlength="100"
				placeholder="correo@ejemplo.com"
				class:error-input={!!errorEmail}
			/>
			{#if errorEmail}
				<span class="error">{errorEmail}</span>
			{/if}
		</div>

		<div class="campo">
			<label for="telefono">Teléfono</label>
			<input
				id="telefono"
				type="text"
				value={telefono}
				on:input={manejarTelefono}
				maxlength="10"
				placeholder="5512345678"
				class:error-input={!!errorTelefono}
			/>
			{#if errorTelefono}
				<span class="error">{errorTelefono}</span>
			{/if}
		</div>

		<div class="campo">
			<label for="fecha">Fecha de nacimiento</label>
			<input
				id="fecha"
				type="date"
				bind:value={fecha}
				class:error-input={!!errorFecha}
			/>
			{#if errorFecha}
				<span class="error">{errorFecha}</span>
			{/if}
		</div>

		<div class="botones">
			<button class="enviar" on:click={enviarFormulario}>Enviar</button>
			<button class="inicio" on:click={volverInicio}>
				Volver al inicio
			</button>
		</div>
	</div>

	{#if registros.length > 0}
		<div class="registros">
			<h2>Registros Guardados</h2>

			<div class="cards">
				{#each registros as registro}
					<div class="registro-card">
						<div class="card-header">
							<span class="badge">ID: {registro.id}</span>
						</div>
						<div class="card-body">
							<p><strong>Nombre:</strong> {registro.nombre}</p>
							<p><strong>Edad:</strong> {registro.edad} años</p>
							<p><strong>Email:</strong> {registro.email}</p>
						</div>
						<button
							class="eliminar"
							on:click={() => eliminar(registro.id)}
						>
							Eliminar
						</button>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.contenedor {
		max-width: 1200px;
		margin: 0 auto;
		padding: 40px 20px;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background: #f5f5f5;
		min-height: 100vh;
	}

	.card {
		background: white;
		padding: 40px;
		border-radius: 20px;
		box-shadow: 0 10px 30px rgba(123, 30, 58, 0.1);
		margin-bottom: 40px;
		border: 1px solid rgba(123, 30, 58, 0.1);
	}

	h1 {
		text-align: center;
		color: #7B1E3A;
		font-size: 2.5em;
		margin-bottom: 30px;
		font-weight: 600;
		position: relative;
	}

	h1::after {
		content: '';
		display: block;
		width: 80px;
		height: 4px;
		background: #7B1E3A;
		margin: 15px auto 0;
		border-radius: 2px;
	}

	h2 {
		color: #7B1E3A;
		font-size: 2em;
		margin-bottom: 20px;
		text-align: center;
	}

	.campo {
		display: flex;
		flex-direction: column;
		margin-bottom: 25px;
	}

	label {
		color: #7B1E3A;
		font-weight: 600;
		margin-bottom: 8px;
		font-size: 1.1em;
	}

	input {
		padding: 14px 16px;
		border-radius: 12px;
		border: 2px solid #e0e0e0;
		font-size: 1em;
		transition: all 0.3s ease;
		outline: none;
		background: #fafafa;
	}

	input:focus {
		border-color: #7B1E3A;
		box-shadow: 0 0 0 3px rgba(123, 30, 58, 0.2);
	}

	input.error-input {
		border-color: #c62828;
		background-color: #fff8f8;
	}

	input.error-input:focus {
		box-shadow: 0 0 0 3px rgba(198, 40, 40, 0.2);
	}

	.error {
		color: #c62828;
		font-size: 0.9em;
		margin-top: 5px;
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.error::before {
		content: '⚠️';
		font-size: 0.9em;
	}

	.botones {
		display: flex;
		gap: 15px;
		margin-top: 20px;
	}

	button {
		padding: 14px 24px;
		border-radius: 12px;
		border: none;
		font-size: 1.1em;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		flex: 1;
	}

	.enviar {
		background: #7B1E3A;
		color: white;
		box-shadow: 0 4px 15px rgba(123, 30, 58, 0.3);
	}

	.enviar:hover {
		background: #5e162b;
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(123, 30, 58, 0.4);
	}

	.inicio {
		background: #2c3e50;
		color: white;
		box-shadow: 0 4px 15px rgba(44, 62, 80, 0.3);
	}

	.inicio:hover {
		background: #1a252f;
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(44, 62, 80, 0.4);
	}

	.registros {
		background: linear-gradient(135deg, #fff5f7 0%, #ffffff 100%);
		padding: 40px;
		border-radius: 20px;
		box-shadow: 0 10px 30px rgba(123, 30, 58, 0.1);
		border: 1px solid rgba(123, 30, 58, 0.1);
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 25px;
		margin-top: 30px;
	}

	.registro-card {
		background: white;
		padding: 0;
		border-radius: 16px;
		box-shadow: 0 8px 25px rgba(123, 30, 58, 0.1);
		transition: all 0.3s ease;
		border: 1px solid rgba(123, 30, 58, 0.1);
		overflow: hidden;
	}

	.registro-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 15px 35px rgba(123, 30, 58, 0.2);
		border-color: #7B1E3A;
	}

	.card-header {
		background: #7B1E3A;
		padding: 15px 20px;
		border-bottom: 2px solid #5e162b;
	}

	.badge {
		background: rgba(255, 255, 255, 0.2);
		color: white;
		padding: 5px 12px;
		border-radius: 20px;
		font-size: 0.9em;
		font-weight: 600;
		display: inline-block;
	}

	.card-body {
		padding: 20px;
	}

	.card-body p {
		margin: 10px 0;
		color: #333;
		font-size: 1em;
	}

	.card-body strong {
		color: #7B1E3A;
		font-weight: 600;
	}

	.eliminar {
		background: #7B1E3A;
		color: white;
		padding: 12px;
		margin: 0 20px 20px 20px;
		width: calc(100% - 40px);
		border-radius: 10px;
		font-size: 1em;
		box-shadow: 0 4px 15px rgba(123, 30, 58, 0.2);
	}

	.eliminar:hover {
		background: #5e162b;
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(123, 30, 58, 0.3);
	}

	@media (max-width: 768px) {
		.contenedor {
			padding: 20px;
		}

		.card {
			padding: 25px;
		}

		h1 {
			font-size: 2em;
		}

		.botones {
			flex-direction: column;
		}

		.cards {
			grid-template-columns: 1fr;
		}
	}
</style>