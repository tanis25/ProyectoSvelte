<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	let menuOpen: boolean = false;

	const breadcrumbs = derived(page, ($page) => {
		const segments = $page.url.pathname.split('/').filter(Boolean);

		let crumbs = [{ name: 'Inicio', path: '/' }];

		segments.forEach((segment, index) => {
			const path = '/' + segments.slice(0, index + 1).join('/');
			crumbs.push({
				name: segment.charAt(0).toUpperCase() + segment.slice(1),
				path
			});
		});

		return crumbs;
	});
</script>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background: #F3F4F6;
		color: #1F2937;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background: #1F2937;
		color: white;
		box-shadow: 0 3px 10px rgba(0,0,0,0.2);
		position: relative;
	}

	header h2 {
		margin: 0;
		font-weight: 600;
	}

	.menu-icon {
		background: none;
		border: none;
		color: white;
		font-size: 26px;
		cursor: pointer;
		transition: 0.2s;
	}

	.menu-icon:hover {
		color: #7B1E3A;
		transform: scale(1.1);
	}

	.dropdown {
		position: absolute;
		top: 65px;
		right: 25px;
		background: white;
		padding: 15px;
		border-radius: 14px;
		box-shadow: 0 10px 25px rgba(0,0,0,0.15);
		display: flex;
		flex-direction: column;
		gap: 10px;
		min-width: 190px;
		animation: fadeIn 0.2s ease-in-out;
	}

	.dropdown a {
		text-decoration: none;
		color: #1F2937;
		font-weight: 500;
		padding: 8px;
		border-radius: 8px;
		transition: 0.2s;
	}

	.dropdown a:hover {
		background: #7B1E3A;
		color: white;
	}

	main {
		padding: 2rem;
		max-width: 1200px;
		margin: auto;
	}

	.breadcrumbs {
		margin-bottom: 25px;
		font-size: 14px;
	}

	.breadcrumbs a {
		text-decoration: none;
		color: #7B1E3A;
		font-weight: 500;
	}

	.breadcrumbs span {
		margin: 0 6px;
		color: #888;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(-5px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>

<header>
	<h2>Mi Proyecto Escolar</h2>

	<button class="menu-icon" on:click={() => menuOpen = !menuOpen}>
		☰
	</button>

	{#if menuOpen}
		<div class="dropdown">
			<a href="/login">Iniciar Sesión</a>
			<a href="/registro">Registrar Usuario</a>
		</div>
	{/if}
</header>

<main>
	<div class="breadcrumbs">
		{#each $breadcrumbs as crumb, index}
			<a href={crumb.path}>{crumb.name}</a>
			{#if index < $breadcrumbs.length - 1}
				<span>></span>
			{/if}
		{/each}
	</div>

	<slot />
</main>