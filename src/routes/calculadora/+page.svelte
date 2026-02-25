<script lang="ts">
	let numero1: string = "";
	let numero2: string = "";
	let resultado: string = "";

	function soloNumeros(event: Event) {
		const input = event.target as HTMLInputElement;
		input.value = input.value.replace(/[^0-9]/g, '');
	}

	function sumar() {
		const res = Number(numero1) + Number(numero2);
		resultado = res.toString();
	}

	function dividir() {
		if (Number(numero2) === 0) {
			resultado = "No se puede dividir entre 0";
		} else {
			const res = Number(numero1) / Number(numero2);
			resultado = res.toString();
		}
	}

	function limpiar() {
		numero1 = "";
		numero2 = "";
		resultado = "";
	}
</script>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: #f4f6f9;
		padding: 20px;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.card {
		background: white;
		padding: 40px;
		border-radius: 24px;
		box-shadow: 0 15px 35px rgba(123, 30, 58, 0.15);
		width: 100%;
		max-width: 400px;
		border: 1px solid rgba(123, 30, 58, 0.1);
	}

	h2 {
		color: #7B1E3A;
		font-size: 2.2em;
		margin-bottom: 30px;
		text-align: center;
		font-weight: 600;
		position: relative;
	}

	h2::after {
		content: '';
		display: block;
		width: 60px;
		height: 4px;
		background: #7B1E3A;
		margin: 15px auto 0;
		border-radius: 2px;
	}

	.input-group {
		margin-bottom: 20px;
	}

	input {
		width: 100%;
		padding: 16px 20px;
		border: 2px solid #e0e0e0;
		border-radius: 16px;
		font-size: 1.1em;
		text-align: center;
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
		font-size: 0.9em;
	}

	.botones {
		display: flex;
		gap: 12px;
		margin: 25px 0 20px;
		flex-wrap: wrap;
	}

	button {
		flex: 1;
		min-width: 100px;
		padding: 14px 20px;
		border: none;
		border-radius: 16px;
		font-size: 1em;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		background: #7B1E3A;
		color: white;
		box-shadow: 0 4px 15px rgba(123, 30, 58, 0.3);
	}

	button:hover {
		background: #5e162b;
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(123, 30, 58, 0.4);
	}

	button.limpiar {
		background: #2c3e50;
		box-shadow: 0 4px 15px rgba(44, 62, 80, 0.3);
	}

	button.limpiar:hover {
		background: #1a252f;
	}

	button.inicio {
		background: #7B1E3A;
		width: 100%;
		margin-top: 15px;
	}

	.resultado {
		background: linear-gradient(135deg, #fff5f7, #ffffff);
		padding: 20px;
		border-radius: 16px;
		margin: 20px 0;
		text-align: center;
		border: 2px solid rgba(123, 30, 58, 0.1);
	}

	.resultado p {
		color: #7B1E3A;
		font-size: 1.3em;
		font-weight: 600;
		margin: 0;
		word-break: break-word;
	}

	.resultado span {
		font-size: 1.1em;
		color: #333;
		font-weight: normal;
	}

	@media (max-width: 480px) {
		.card {
			padding: 25px;
		}

		h2 {
			font-size: 1.8em;
		}

		.botones {
			flex-direction: column;
		}

		button {
			width: 100%;
		}
	}
</style>

<div class="container">
	<div class="card">
		<h2>Calculadora</h2>

		<div class="input-group">
			<input 
				type="text" 
				bind:value={numero1} 
				on:input={soloNumeros} 
				placeholder="Número 1"
			/>
		</div>

		<div class="input-group">
			<input 
				type="text" 
				bind:value={numero2} 
				on:input={soloNumeros} 
				placeholder="Número 2"
			/>
		</div>

		<div class="botones">
			<button on:click={sumar}>Sumar</button>
			<button on:click={dividir}>Dividir</button>
			<button class="limpiar" on:click={limpiar}>Limpiar</button>
		</div>

		{#if resultado !== ""}
			<div class="resultado">
				<p>
					Resultado: 
					<br />
					<span>{resultado}</span>
				</p>
			</div>
		{/if}

		<a href="/">
			<button class="inicio"> Volver al Inicio</button>
		</a>
	</div>
</div>