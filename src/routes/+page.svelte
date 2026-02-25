<style>
	.container {
		text-align: center;
		margin-top: 40px;
	}

	h1 {
		color: #1e1e2f;
		margin-bottom: 30px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
		max-width: 800px;
		margin: auto;
	}

	.card {
		background: white;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0,0,0,0.1);
		transition: transform 0.2s;
		text-decoration: none;
		color: #1e1e2f;
		font-weight: bold;
	}

	.card:hover {
		transform: translateY(-5px);
		background: #7B1E3A;
		color: white;
	}
</style>

<div class="container">
	<h1>Registro Seguro</h1>

	<div class="grid">
		<a class="card" href="/calculadora">Calculadora</a>
		<a class="card" href="/formulario">Formulario</a>
		<a class="card" href="/carrusel">Carrusel</a>
		<a class="card" href="/hola">Hola Mundo</a>
		<a class="card" href="/galeria">Galería Cloudinary</a>
		<a class="card" href="/errores">Mostrar Error</a>
        <a class="card" href="/usuarios">Usuarios</a>
        <a class="card" href="/registro">Registro</a>
	</div>

	<p style="margin-top:40px; color: #666;">
		Bienvenido al sistema principal del proyecto.
	</p>
</div>