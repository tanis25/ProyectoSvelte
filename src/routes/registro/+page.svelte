<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let texto = '';
	let mensaje = '';
	let captchaValido = false;

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://js.hcaptcha.com/1/api.js';
		script.async = true;
		document.body.appendChild(script);

		(window as any).captchaSuccess = () => {
			captchaValido = true;
		};
	});

	function enviar() {
		if (!captchaValido) {
			mensaje = 'Completa el hCaptcha';
			return;
		}

		if (texto.trim() === '') {
			mensaje = 'No puedes enviar vacío';
			return;
		}

		mensaje = '✓ Datos guardados correctamente. Tu información se registró sin problemas.';
		texto = '';
	}

	function volverInicio() {
		goto('/');
	}
</script>

<div class="container">
	<div class="card">
		<h1>Registro Seguro</h1>

		<div class="input-group">
			<input
				type="text"
				placeholder="Escribe tu información..."
				bind:value={texto}
			/>
		</div>

		<div class="captcha-container">
			<div
				class="h-captcha"
				data-sitekey="3c5e1628-a7fe-4a88-b844-7a0ca0fcd306"
				data-callback="captchaSuccess"
			></div>
		</div>

		<div class="botones">
			<button class="enviar" on:click={enviar}>Enviar</button>
			<button class="inicio" on:click={volverInicio}>
				Volver al Inicio
			</button>
		</div>

		{#if mensaje}
			<div class="mensaje" class:error={mensaje.includes('Completa') || mensaje.includes('vacío')} class:success={mensaje.includes('✓')}>
				{mensaje}
			</div>
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: linear-gradient(135deg, #f4f6f9 0%, #ffffff 100%);
		padding: 20px;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.card {
		background: white;
		padding: 50px 40px;
		border-radius: 32px;
		box-shadow: 0 20px 40px rgba(123, 30, 58, 0.15);
		max-width: 500px;
		width: 100%;
		border: 1px solid rgba(123, 30, 58, 0.1);
		text-align: center;
	}

	h1 {
		color: #7B1E3A;
		font-size: 2.5em;
		margin: 0 0 30px 0;
		font-weight: 700;
		letter-spacing: -0.5px;
		position: relative;
		display: inline-block;
	}

	h1::after {
		content: '';
		display: block;
		width: 60px;
		height: 4px;
		background: #7B1E3A;
		margin: 15px auto 0;
		border-radius: 2px;
	}

	.input-group {
		margin-bottom: 25px;
		width: 100%;
	}

	input {
		width: 100%;
		padding: 16px 20px;
		border: 2px solid #e0e0e0;
		border-radius: 16px;
		font-size: 1em;
		transition: all 0.3s ease;
		outline: none;
		background: #fafafa;
		box-sizing: border-box;
	}

	input:focus {
		border-color: #7B1E3A;
		box-shadow: 0 0 0 4px rgba(123, 30, 58, 0.1);
	}

	input::placeholder {
		color: #999;
		font-size: 0.95em;
	}

	.captcha-container {
		display: flex;
		justify-content: center;
		margin: 25px 0 20px;
		padding: 10px;
		background: #fff5f7;
		border-radius: 16px;
		border: 1px solid rgba(123, 30, 58, 0.1);
	}

	.botones {
		display: flex;
		gap: 15px;
		margin: 25px 0 20px;
		flex-wrap: wrap;
	}

	button {
		flex: 1;
		min-width: 140px;
		padding: 16px 24px;
		border: none;
		border-radius: 50px;
		font-size: 1em;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		letter-spacing: 0.5px;
	}

	button.enviar {
		background: #7B1E3A;
		color: white;
		box-shadow: 0 8px 20px rgba(123, 30, 58, 0.3);
	}

	button.enviar:hover {
		background: #5e162b;
		transform: translateY(-3px);
		box-shadow: 0 15px 30px rgba(123, 30, 58, 0.4);
	}

	button.inicio {
		background: #2c3e50;
		color: white;
		box-shadow: 0 8px 20px rgba(44, 62, 80, 0.3);
	}

	button.inicio:hover {
		background: #1a252f;
		transform: translateY(-3px);
		box-shadow: 0 15px 30px rgba(44, 62, 80, 0.4);
	}

	button:active {
		transform: translateY(-1px);
	}

	.mensaje {
		margin-top: 25px;
		padding: 16px 20px;
		border-radius: 16px;
		font-size: 0.95em;
		font-weight: 500;
		text-align: center;
		animation: slideIn 0.3s ease;
	}

	.mensaje.error {
		background: #ffe5e5;
		color: #c62828;
		border-left: 4px solid #c62828;
	}

	.mensaje.success {
		background: #e8f5e9;
		color: #2e7d32;
		border-left: 4px solid #2e7d32;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Estilos para hCaptcha */
	:global(.h-captcha) {
		transform: scale(0.95);
		margin: 0 auto;
	}

	@media (max-width: 480px) {
		.card {
			padding: 35px 25px;
		}

		h1 {
			font-size: 2em;
		}

		.botones {
			flex-direction: column;
		}

		button {
			width: 100%;
		}

		:global(.h-captcha) {
			transform: scale(0.85);
		}
	}
</style>