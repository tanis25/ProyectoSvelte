<script lang="ts">
  export let data;

  let search = data.filtros.search;
  let desde = data.filtros.desde;
  let hasta = data.filtros.hasta;
  let showCreate = false;
  let showEdit = false;
  let editUser: any = null;

  // Variables para errores de validación
  let nombreError = '';
  let paternoError = '';
  let maternoError = '';

  function openEdit(user: any) {
    editUser = user;
    showEdit = true;
    // Limpiar errores al abrir
    nombreError = '';
    paternoError = '';
    maternoError = '';
  }

  function limpiar() {
    window.location.href = '/usuarios';
  }

  // Función para validar que solo contenga letras (incluyendo acentos y ñ)
  function soloLetras(texto: string): boolean {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(texto);
  }

  // Validar campo específico
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

  // Limpiar errores al abrir crear
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
  .primary {
    background: #7B1E3A;
    color: white;
  }
  .warning {
    background: #7B1E3A;
    color: white;
  }
  .danger {
    background: #cc0505;
    color: white;
  }
  .gray {
    background: #6b7280;
    color: white;
  }
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
  .paginacion a.activo {
    background: #7B1E3A;
    color: white;
    border-color: #7B1E3A;
  }
  .paginacion a:hover:not(.activo) {
    background: #f0f0f0;
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

  /* DISEÑO MODERNO PARA MODALES */
  .modal-box.moderno {
    background: linear-gradient(135deg, #f9f9f9, #ffffff);
    border-radius: 20px;
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
    width: 450px;
    padding: 30px;
  }
  .modal-box.moderno h3 {
    margin-top: 0;
    color: #7B1E3A;
    font-size: 28px;
    font-weight: 600;
    text-align: center;
    border-bottom: 2px solid #7B1E3A;
    padding-bottom: 10px;
  }
  .modal-box.moderno form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .modal-box.moderno input {
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 30px;
    font-size: 16px;
    transition: 0.3s;
    outline: none;
    background: #fafafa;
  }
  .modal-box.moderno input:focus {
    border-color: #7B1E3A;
    box-shadow: 0 0 0 3px rgba(123, 30, 58, 0.2);
  }
  .modal-box.moderno input.error {
    border-color: #ff4444;
  }
  .modal-box.moderno .error-mensaje {
    color: #ff4444;
    font-size: 12px;
    margin-top: -10px;
    margin-bottom: 5px;
    padding-left: 15px;
  }
  .modal-box.moderno .botones {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 10px;
  }
  .modal-box.moderno .botones button {
    flex: 1;
    padding: 12px;
    border-radius: 30px;
    font-weight: bold;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: 0.2s;
  }
  .modal-box.moderno .botones button.primary {
    background: #7B1E3A;
    color: white;
  }
  .modal-box.moderno .botones button.primary:hover {
    background: #5e162b;
  }
  .modal-box.moderno .botones button.warning {
    background: #7B1E3A;
    color: white;
  }
  .modal-box.moderno .botones button.warning:hover {
    background: #5e162b;
  }
  .modal-box.moderno .botones button.cancelar {
    background: #b0b0b0;
    color: white;
  }
  .modal-box.moderno .botones button.cancelar:hover {
    background: #8f8f8f;
  }
  .modal-box.moderno .botones button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* NUEVO DISEÑO PARA BOTÓN CREAR USUARIO */
  .btn-crear {
    background: linear-gradient(135deg, #7B1E3A, #9f2b4f);
    color: white;
    padding: 14px 28px;
    border-radius: 50px;
    font-size: 1.1em;
    font-weight: 600;
    box-shadow: 0 8px 20px rgba(123, 30, 58, 0.3);
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-crear:hover {
    background: linear-gradient(135deg, #5e162b, #7B1E3A);
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(123, 30, 58, 0.4);
  }
  .btn-crear:active {
    transform: translateY(-1px);
  }

  /* NUEVO DISEÑO PARA FILTROS - CORREGIDO */
  .filtros-container {
    background: white;
    padding: 25px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(123, 30, 58, 0.1);
    margin-bottom: 20px;
    border: 1px solid rgba(123, 30, 58, 0.1);
  }
  .filtros-titulo {
    color: #7B1E3A;
    font-size: 1.2em;
    font-weight: 600;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .filtros-grid {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .buscador-full {
    width: 100%;
  }
  .fechas-row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 15px;
  }
  .fecha-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 150px;
    flex: 1 1 auto;
  }
  .fecha-label {
    color: #7B1E3A;
    font-weight: 500;
    font-size: 0.9em;
    margin-left: 5px;
  }
  .botones-filtros {
    display: flex;
    gap: 10px;
    margin-left: auto;
    flex-wrap: wrap;
  }
  .filtro-input {
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 30px;
    font-size: 0.95em;
    transition: all 0.3s ease;
    outline: none;
    background: #fafafa;
    width: 100%;
    box-sizing: border-box;
  }
  .filtro-input:focus {
    border-color: #7B1E3A;
    box-shadow: 0 0 0 3px rgba(123, 30, 58, 0.1);
  }
  .filtro-input[type="date"] {
    min-width: 140px;
  }
  .btn-filtro {
    padding: 12px 24px;
    border-radius: 30px;
    font-weight: 600;
    font-size: 0.95em;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    white-space: nowrap;
  }
  .btn-filtro.primary {
    background: #7B1E3A;
    color: white;
    box-shadow: 0 4px 15px rgba(123, 30, 58, 0.2);
  }
  .btn-filtro.primary:hover {
    background: #5e162b;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(123, 30, 58, 0.3);
  }
  .btn-filtro.gray {
    background: #2c3e50;
    color: white;
    box-shadow: 0 4px 15px rgba(44, 62, 80, 0.2);
  }
  .btn-filtro.gray:hover {
    background: #1a252f;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(44, 62, 80, 0.3);
  }

  @media (max-width: 768px) {
    .fechas-row {
      flex-direction: column;
      align-items: stretch;
    }
    .fecha-item {
      width: 100%;
    }
    .botones-filtros {
      margin-left: 0;
      justify-content: stretch;
    }
    .btn-filtro {
      flex: 1;
    }
  }
</style>

<div class="container">
  <a href="/" class="inicio-btn"> Volver al inicio</a>
  <h2>Gestión de Usuarios</h2>

  <!-- BOTÓN CREAR USUARIO REDISEÑADO -->
  <div style="margin-bottom: 20px;">
    <button class="btn-crear" on:click={abrirCrear}> + Crear Usuario </button>
  </div>

  <!-- FILTROS REDISEÑADOS - CORREGIDO -->
  <div class="filtros-container">
    <div class="filtros-titulo"> 🔍 Buscar y filtrar usuarios </div>
    <form method="GET">
      <div class="filtros-grid">
        <!-- Primera fila: Buscador -->
        <div class="buscador-full">
          <input type="text" name="search" placeholder="Buscar nombre o apellido..." value={search} class="filtro-input" />
        </div>
        <!-- Segunda fila: Fechas y botones -->
        <div class="fechas-row">
          <div class="fecha-item">
            <span class="fecha-label">Desde</span>
            <input type="date" name="desde" value={desde} class="filtro-input" />
          </div>
          <div class="fecha-item">
            <span class="fecha-label">Hasta</span>
            <input type="date" name="hasta" value={hasta} class="filtro-input" />
          </div>
          <div class="botones-filtros">
            <button type="submit" class="btn-filtro primary"> Aplicar Filtros </button>
            <button type="button" class="btn-filtro gray" on:click={limpiar}> Limpiar </button>
          </div>
        </div>
      </div>
    </form>
  </div>

  <!-- TABLA DE USUARIOS (SIN COLUMNA ID) -->
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
              <button class="warning" on:click={() => openEdit(u)}> Editar </button>
              <form method="POST" style="display:inline">
                <input type="hidden" name="id" value={u.id} />
                <button class="danger" formaction="?/eliminar"> Eliminar </button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- PAGINADO CON 4 FLECHAS -->
  {#if data.totalPages > 0}
    {@const current = data.page}
    {@const total = data.totalPages}
    
    <div class="paginacion">
      <!-- Flecha inicio (primera página) -->
      <a 
        href="?page=1&search={search}&desde={desde}&hasta={hasta}" 
        class={current <= 1 ? 'disabled' : ''}
        title="Primera página"
      >
        ⏮️
      </a>
      
      <!-- Flecha anterior -->
      <a 
        href="?page={current - 1}&search={search}&desde={desde}&hasta={hasta}" 
        class={current <= 1 ? 'disabled' : ''}
        title="Página anterior"
      >
        ◀️
      </a>
      
      <!-- Número de página actual -->
      <span class="activo">{current}</span>
      
      <!-- Flecha siguiente -->
      <a 
        href="?page={current + 1}&search={search}&desde={desde}&hasta={hasta}" 
        class={current >= total ? 'disabled' : ''}
        title="Página siguiente"
      >
        ▶️
      </a>
      
      <!-- Flecha fin (última página) -->
      <a 
        href="?page={total}&search={search}&desde={desde}&hasta={hasta}" 
        class={current >= total ? 'disabled' : ''}
        title="Última página"
      >
        ⏭️
      </a>
    </div>
  {/if}
</div>

{#if showCreate}
  <div class="modal">
    <div class="modal-box moderno">
      <h3>Crear Usuario</h3>
      <form method="POST">
        <input name="nombre" placeholder="Nombre" required on:input={validarNombre} class:error={!!nombreError} />
        {#if nombreError}
          <div class="error-mensaje">{nombreError}</div>
        {/if}
        <input name="apellido_paterno" placeholder="Apellido Paterno" required on:input={validarPaterno} class:error={!!paternoError} />
        {#if paternoError}
          <div class="error-mensaje">{paternoError}</div>
        {/if}
        <input name="apellido_materno" placeholder="Apellido Materno" required on:input={validarMaterno} class:error={!!maternoError} />
        {#if maternoError}
          <div class="error-mensaje">{maternoError}</div>
        {/if}
        <input type="date" name="fecha_nacimiento" required />
        <input type="password" name="password" placeholder="Contraseña" required />
        <div class="botones">
          <button class="primary" formaction="?/crear" disabled={!!nombreError || !!paternoError || !!maternoError}>
            Guardar
          </button>
          <button class="cancelar" type="button" on:click={() => showCreate = false}> Cancelar </button>
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
        <input name="nombre" placeholder="Nombre" value={editUser.nombre} required on:input={validarNombre} class:error={!!nombreError} />
        {#if nombreError}
          <div class="error-mensaje">{nombreError}</div>
        {/if}
        <input name="apellido_paterno" placeholder="Apellido Paterno" value={editUser.apellido_paterno} required on:input={validarPaterno} class:error={!!paternoError} />
        {#if paternoError}
          <div class="error-mensaje">{paternoError}</div>
        {/if}
        <input name="apellido_materno" placeholder="Apellido Materno" value={editUser.apellido_materno} required on:input={validarMaterno} class:error={!!maternoError} />
        {#if maternoError}
          <div class="error-mensaje">{maternoError}</div>
        {/if}
        <input type="date" name="fecha_nacimiento" value={editUser.fecha_nacimiento} required />
        <div class="botones">
          <button class="warning" formaction="?/editar" disabled={!!nombreError || !!paternoError || !!maternoError}>
            Actualizar
          </button>
          <button class="cancelar" type="button" on:click={() => showEdit = false}> Cancelar </button>
        </div>
      </form>
    </div>
  </div>
{/if}