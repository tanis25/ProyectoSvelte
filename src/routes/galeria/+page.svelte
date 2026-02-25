<script lang="ts">
  export let data;
  export let form;
</script>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f4f6f9;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    background: white;
    padding: 20px 30px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(123, 30, 58, 0.08);
    border: 1px solid rgba(123, 30, 58, 0.1);
  }

  h1 {
    font-size: 28px;
    margin: 0;
    color: #7B1E3A;
    font-weight: 600;
    position: relative;
  }

  h1::after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background: #7B1E3A;
    margin-top: 8px;
    border-radius: 2px;
  }

  .btn-home {
    padding: 12px 24px;
    background: #7B1E3A;
    color: white;
    cursor: pointer;
    border-radius: 12px;
    text-decoration: none;
    font-size: 1em;
    font-weight: 500;
    border: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(123, 30, 58, 0.2);
  }

  .btn-home:hover {
    background: #5e162b;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(123, 30, 58, 0.3);
  }

  .layout {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 30px;
  }

  /* PANEL */
  .panel {
    background: white;
    border: 1px solid rgba(123, 30, 58, 0.1);
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(123, 30, 58, 0.1);
    height: fit-content;
  }

  .panel h2 {
    margin-top: 0;
    margin-bottom: 25px;
    font-size: 1.5em;
    color: #7B1E3A;
    font-weight: 600;
    text-align: center;
  }

  .file-box {
    border: 2px dashed #7B1E3A;
    border-radius: 16px;
    padding: 30px 20px;
    text-align: center;
    background: #fff5f7;
    transition: all 0.3s ease;
  }

  .file-box:hover {
    background: #ffeef2;
    border-color: #5e162b;
  }

  .file-box p {
    color: #7B1E3A;
    margin-bottom: 15px;
    font-weight: 500;
  }

  input[type="file"] {
    margin-top: 10px;
    padding: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid rgba(123, 30, 58, 0.2);
    width: 100%;
    cursor: pointer;
  }

  input[type="file"]::file-selector-button {
    background: #7B1E3A;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    margin-right: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  input[type="file"]::file-selector-button:hover {
    background: #5e162b;
  }

  .btn-upload {
    margin-top: 20px;
    width: 100%;
    padding: 14px;
    border: none;
    background: #7B1E3A;
    color: white;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(123, 30, 58, 0.3);
  }

  .btn-upload:hover {
    background: #5e162b;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(123, 30, 58, 0.4);
  }

  .message {
    margin-top: 20px;
    padding: 15px;
    border-radius: 12px;
    font-size: 0.95em;
    font-weight: 500;
  }

  .error {
    background: #ffe5e5;
    color: #c62828;
    border-left: 4px solid #c62828;
  }

  .success {
    background: #e8f5e9;
    color: #2e7d32;
    border-left: 4px solid #2e7d32;
  }

  /* GALERÍA */
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 25px;
  }

  .card {
    position: relative;
    background: white;
    border: 1px solid rgba(123, 30, 58, 0.1);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(123, 30, 58, 0.1);
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(123, 30, 58, 0.2);
    border-color: #7B1E3A;
  }

  .card img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    transition: all 0.3s ease;
  }

  .card:hover img {
    transform: scale(1.05);
  }

  .delete-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #7B1E3A;
    color: white;
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    opacity: 0;
  }

  .card:hover .delete-btn {
    opacity: 1;
  }

  .delete-btn:hover {
    background: #c62828;
    transform: scale(1.1);
  }

  .empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px;
    color: #7B1E3A;
    background: white;
    border-radius: 16px;
    border: 2px dashed rgba(123, 30, 58, 0.2);
    font-size: 1.2em;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .layout {
      grid-template-columns: 1fr;
    }

    .header {
      flex-direction: column;
      gap: 15px;
      text-align: center;
    }

    h1::after {
      margin: 8px auto 0;
    }
  }
</style>

<div class="container">

  <div class="header">
    <h1>Galería de Imágenes</h1>
    <a href="/" class="btn-home">Volver al Inicio</a>
  </div>

  <div class="layout">

    <!-- PANEL IZQUIERDO -->
    <div class="panel">
      <h2>Subir Imagen</h2>

      <form method="POST" action="?/upload" enctype="multipart/form-data">
        <div class="file-box">
          <p>Solo se permiten imágenes (JPG, PNG, WEBP)</p>
          <input
            type="file"
            name="file"
            accept="image/jpeg,image/png,image/webp"
            required
          />
        </div>

        <button type="submit" class="btn-upload">
          Subir Imagen
        </button>
      </form>

      {#if form?.error}
        <div class="message error">
          {form.error}
        </div>
      {/if}

      {#if form?.success}
        <div class="message success">
          Imagen subida correctamente.
        </div>
      {/if}
    </div>

    <!-- GALERÍA -->
    <div class="gallery">

      {#if data.images.length === 0}
        <div class="empty">
          No hay imágenes guardadas.
        </div>
      {/if}

      {#each data.images as img}
        <div class="card">
          <img
            src={`data:${img.tipo};base64,${img.imagen}`}
            alt={img.nombre}
          />

          <form method="POST" action="?/delete">
            <input type="hidden" name="id" value={img.id} />
            <button class="delete-btn" type="submit">×</button>
          </form>
        </div>
      {/each}

    </div>

  </div>

</div>