<script lang="ts">
	let mensajeError: string = "Algo salió mal. Inténtalo nuevamente.";
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
		max-width: 500px;
		width: 100%;
		border: 1px solid rgba(123, 30, 58, 0.1);
		text-align: center;
		transform: translateY(20px);
		opacity: 0;
		transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	.card.animated {
		transform: translateY(0);
		opacity: 1;
	}

	.error-icon {
		font-size: 5em;
		line-height: 1;
		margin-bottom: 20px;
		color: #7B1E3A;
	}

	h2 {
		color: #7B1E3A;
		font-size: 2.5em;
		margin: 0 0 15px 0;
		font-weight: 700;
		letter-spacing: -0.5px;
		position: relative;
		display: inline-block;
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

	p {
		color: #666;
		font-size: 1.2em;
		margin: 25px 0 35px;
		font-weight: 400;
		line-height: 1.6;
		background: #fff5f7;
		padding: 20px;
		border-radius: 16px;
		border: 1px solid rgba(123, 30, 58, 0.1);
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
		margin-top: 10px;
	}

	button:hover {
		background: #5e162b;
		transform: translateY(-3px);
		box-shadow: 0 15px 30px rgba(123, 30, 58, 0.4);
	}

	button:active {
		transform: translateY(-1px);
	}

	.codigo-error {
		margin-top: 25px;
		color: #999;
		font-size: 0.9em;
		border-top: 1px dashed #ddd;
		padding-top: 25px;
	}

	.codigo-error span {
		background: #f0f0f0;
		padding: 5px 12px;
		border-radius: 20px;
		color: #7B1E3A;
		font-weight: 600;
	}

	@media (max-width: 480px) {
		.card {
			padding: 40px 25px;
		}

		h2 {
			font-size: 2em;
		}

		p {
			font-size: 1em;
			padding: 15px;
		}

		button {
			width: 100%;
			padding: 16px 20px;
		}
	}
</style>

<div class="container">
	<div class="card" class:animated>
		<div class="error-icon">⚠️</div>
		
		<h2>Error</h2>
		
		<p>{mensajeError}</p>

		<a href="/">
			<button>Volver al Inicio</button>
		</a>

		<div class="codigo-error">
			<span>Código: ERR-{Math.floor(Math.random() * 1000)}</span>
		</div>
	</div>
</div>