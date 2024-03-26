import { defineStore } from "pinia"
import { Ref, ref } from "vue"
import supabase from '../client/supabaseClient'
import uploadImage from "@/utils/imageUpload"

export type Album = {
  id: string|undefined,
  name: string|undefined,
  artist: string|undefined
  rating: string
  release_year?: string|undefined
  image_url?: string|undefined|null
}

export const useAlbumStore = defineStore('albums', () => {

  const albums: Ref<Array<Album>> = ref([])
  const bucketName = 'album_cover_images';

  const getAllAlbums = async () => {
    const { data, error } = await supabase
      .from('albums')
      .select()

    if (error) {
      console.warn('Could not fetch albums', error)
    }

    if (data) {
      albums.value = data
    }
  }

  const getAlbumById = async (id: string) => {
    const { data, error } = await supabase
      .from('albums')
      .select()
      .eq('id', id)
      .single()

    if (error) {
      console.warn('Could not fetch albums', error)
      return null
    }

    if (data) {
      return data
    }
  }

  const addAlbum = async (album: Partial<Album>) => {
    let imageUrl = album.image_url;

    if (album.image_url && album.image_url.startsWith('blob:')) {
      imageUrl = await uploadImage(album.image_url, bucketName);
    }

    const newAlbum = {
      name: album.name,
      artist: album.artist,
      image_url: imageUrl,
      release_year: album.release_year,
    };

    const { data, error } = await supabase
      .from('albums')
      .insert([newAlbum]);

    if (error) {
      console.warn('Could not add album:', error);
    }

    if(data) {
      await getAllAlbums();
    }
  };

  const updateAlbum = async (album: Partial<Album>) => {
    let imageUrl = album.image_url;

    if (album.image_url && album.image_url.startsWith('blob:')) {
      imageUrl = await uploadImage(album.image_url, bucketName);
    }

    const albumToUpdate = {
      ...album,
      image_url: imageUrl,
    };

    const { data, error } = await supabase
      .from('albums')
      .update([albumToUpdate])
      .eq('id', album.id);

    if (error) {
      console.warn('Could not update album', error);
    }

    if (data) {
      await getAllAlbums();
    }
  };


  const deleteAlbum = async(album: Partial<Album>) => {

    const { data, error } = await supabase
      .from('albums')
      .delete()
      .eq('id', album.id)

    if (error) {
      console.warn('Could not fetch albums', error)
    }

    if (data) {
      await getAllAlbums()
    }
  }

  return {
    albums,
    getAllAlbums,
    getAlbumById,
    addAlbum,
    updateAlbum,
    deleteAlbum,
  }
})
