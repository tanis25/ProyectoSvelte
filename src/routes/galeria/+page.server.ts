import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { getImages, saveImage, deleteImage } from '$lib/server/db';

export const load: PageServerLoad = async () => {
  const images = await getImages();
  return { images };
};

export const actions: Actions = {

  upload: async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return fail(400, { error: 'Selecciona una imagen' });
    }

    if (!file.type.startsWith('image/')) {
      return fail(400, { error: 'Solo se permiten imágenes' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await saveImage(file.name, file.type, buffer);

    return { success: true };
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = Number(formData.get('id'));

    await deleteImage(id);

    return { success: true };
  }

};