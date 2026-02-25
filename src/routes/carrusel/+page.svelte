<script lang="ts">
	import { onMount, onDestroy } from "svelte";

	let imagenActual: number = 0;
	let intervalo: ReturnType<typeof setInterval>;

	const imagenes: string[] = [
		"https://picsum.photos/id/1015/800/400",
		"https://picsum.photos/id/1016/800/400",
		"https://picsum.photos/id/1018/800/400",
		"https://picsum.photos/id/1020/800/400"
	];

	function siguiente() {
		imagenActual = (imagenActual + 1) % imagenes.length;
		reiniciarIntervalo();
	}

	function anterior() {
		imagenActual =
			(imagenActual - 1 + imagenes.length) % imagenes.length;
		reiniciarIntervalo();
	}

	function iniciarCarrusel() {
		intervalo = setInterval(() => {
			imagenActual = (imagenActual + 1) % imagenes.length;
		}, 3000);
	}

	function reiniciarIntervalo() {
		clearInterval(intervalo);
		iniciarCarrusel();
	}

	onMount(() => {
		iniciarCarrusel();
	});

	onDestroy(() => {
		clearInterval(intervalo);
	});
</script>

<style>
	.container {
		text-align: center;
		margin-top: 60px;
	}

	.card {
		background: white;
		padding: 30px;
		border-radius: 20px;
		box-shadow: 0 15px 35px rgba(0,0,0,0.1);
		display: inline-block;
		max-width: 850px;
	}

	h2 {
		color: #7B1E3A;
		margin-bottom: 20px;
	}

	.image-wrapper {
		position: relative;
		width: 800px;
		height: 400px;
		overflow: hidden;
		border-radius: 15px;
		margin: auto;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: opacity 0.6s ease-in-out;
	}

	.controls {
		margin-top: 20px;
	}

	button {
		margin: 0 10px;
		padding: 8px 18px;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		background: #7B1E3A;
		color: white;
		font-weight: 500;
		transition: 0.2s;
	}

	button:hover {
		background: #9F2B4F;
		transform: translateY(-2px);
	}

	.indicators {
		margin-top: 15px;
	}

	.dot {
		display: inline-block;
		width: 10px;
		height: 10px;
		margin: 0 5px;
		background: #ccc;
		border-radius: 50%;
	}

	.active {
		background: #7B1E3A;
	}
</style>

<div class="container">
	<div class="card">
		<h2>Carrusel de Imágenes</h2>

		<div class="image-wrapper">
			<img src={imagenes[imagenActual]} alt="Imagen carrusel" />
		</div>

		<div class="controls">
			<button on:click={anterior}>Anterior</button>
			<button on:click={siguiente}>Siguiente</button>
		</div>

		<div class="indicators">
			{#each imagenes as _, index}
				<span class="dot {index === imagenActual ? 'active' : ''}"></span>
			{/each}
		</div>

		<br />

		<a href="/">
			<button>Volver al Inicio</button>
		</a>
	</div>
</div>