<script lang="ts">
	let mensaje: string = "Hola Mundo desde Svelte";
	let animated = false;
	
	setTimeout(() => {
		animated = true;
	}, 100);
</script>

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
		padding: 60px 50px;
		border-radius: 32px;
		box-shadow: 0 20px 40px rgba(123, 30, 58, 0.15);
		max-width: 600px;
		width: 100%;
		border: 1px solid rgba(123, 30, 58, 0.1);
		transform: translateY(20px);
		opacity: 0;
		transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
		text-align: center;
	}

	.card.animated {
		transform: translateY(0);
		opacity: 1;
	}

	h1 {
		color: #7B1E3A;
		font-size: 3.2em;
		margin: 0 0 20px 0;
		font-weight: 700;
		letter-spacing: -0.5px;
		line-height: 1.2;
		position: relative;
		display: inline-block;
	}

	h1::after {
		content: '';
		display: block;
		width: 80px;
		height: 4px;
		background: #7B1E3A;
		margin: 20px auto 0;
		border-radius: 2px;
	}

	.destacado {
		background: linear-gradient(120deg, #fff5f7 0%, #ffffff 100%);
		padding: 10px 25px;
		border-radius: 50px;
		display: inline-block;
		margin: 0 auto 25px auto;
		color: #7B1E3A;
		font-weight: 500;
		border: 1px solid rgba(123, 30, 58, 0.1);
		font-size: 1.1em;
	}

	button {
		padding: 16px 40px;
		border: none;
		border-radius: 50px;
		background: #7B1E3A;
		color: white;
		cursor: pointer;
		font-weight: 600;
		font-size: 1.1em;
		transition: all 0.3s ease;
		box-shadow: 0 8px 20px rgba(123, 30, 58, 0.3);
		letter-spacing: 0.5px;
		margin-top: 20px;
	}

	button:hover {
		background: #5e162b;
		transform: translateY(-3px);
		box-shadow: 0 15px 30px rgba(123, 30, 58, 0.4);
	}

	button:active {
		transform: translateY(-1px);
	}

	.fecha {
		margin-top: 35px;
		color: #999;
		font-size: 0.9em;
		border-top: 1px dashed #ddd;
		padding-top: 25px;
	}

	@media (max-width: 480px) {
		.card {
			padding: 40px 25px;
		}

		h1 {
			font-size: 2.2em;
		}

		button {
			width: 100%;
			padding: 16px 20px;
		}
	}
</style>

<div class="container">
	<div class="card" class:animated>
		<div class="destacado">
			Bienvenido
		</div>
		
		<h1>{mensaje}</h1>

		<a href="/">
			<button>Volver al Inicio</button>
		</a>

		<div class="fecha">
			{new Date().toLocaleDateString('es-MX', { 
				year: 'numeric', 
				month: 'long', 
				day: 'numeric' 
			})}
		</div>
	</div>
</div>