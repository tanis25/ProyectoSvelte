import type { Actions, PageServerLoad } from './$types';
import { getImages, saveImage, deleteImage } from '$lib/server/db';

export const load: PageServerLoad = async () => {
  try {
    const images = await getImages();
    return { images };
  } catch (error) {
    console.error(error);
    return { images: [] };
  }
};

export const actions: Actions = {

  upload: async ({ request }) => {
    try {
      const formData = await request.formData();
      const file = formData.get('file') as File;

      const errorMessage =
        'Únicamente se permiten archivos de imagen (JPG, PNG, WEBP)';

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      // Validar que exista archivo
      if (!file || file.size === 0) {
        return { error: errorMessage };
      }

      // Validar tipo MIME
      if (!allowedTypes.includes(file.type)) {
        return { error: errorMessage };
      }

      // Validar extensión
      const fileName = file.name.toLowerCase();
      const hasValidExtension = allowedExtensions.some(ext =>
        fileName.endsWith(ext)
      );

      if (!hasValidExtension) {
        return { error: errorMessage };
      }

      // Validar tamaño
      if (file.size > maxSize) {
        return { error: errorMessage };
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      await saveImage(file.name, file.type, buffer);

      return { success: true };

    } catch (error) {
      console.error(error);
      return {
        error: 'Únicamente se permiten archivos de imagen (JPG, PNG, WEBP)'
      };
    }
  },

  delete: async ({ request }) => {
    try {
      const formData = await request.formData();
      const id = Number(formData.get('id'));

      if (!id) {
        return { error: 'Error al eliminar la imagen' };
      }

      await deleteImage(id);

      return { success: true };

    } catch (error) {
      console.error(error);
      return { error: 'Error al eliminar la imagen' };
    }
  }

};