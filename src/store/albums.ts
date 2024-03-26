import { defineStore } from "pinia"
import { Ref, ref } from "vue"
import supabase from '../client/supabaseClient'
import uploadImage from "@/utils/imageUpload"

export type Album = {
  id: string|undefined,
  name: string|undefined,
  artist_name: string
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

    // Attempt to find the artist.
    let { data: artistData, error: artistLookupError } = await supabase
      .from('artists')
      .select('id')
      .eq('name', album.artist_name)
      .maybeSingle();

    // If no artist found, attempt to insert the new artist.
    if (!artistData && (!artistLookupError || artistLookupError.message.includes("No rows found"))) {
      const { data: newArtistData, error: newArtistError } = await supabase
        .from('artists')
        .insert([{ name: album.artist_name }])
        .single();

      if (newArtistError) {
        console.warn('Could not add artist:', newArtistError);
        return;
      }

      artistData = newArtistData;

    } else if (artistLookupError) {
      console.warn('Error checking for artist:', artistLookupError);
      return;
    }

    const newAlbum = {
      name: album.name,
      artist_id: artistData!.id,
      artist_name: album.artist_name,
      rating: album.rating,
      image_url: imageUrl,
      release_year: album.release_year,
    };

    // Insert the album.
    const { data: albumData, error: albumError } = await supabase
      .from('albums')
      .insert([newAlbum]);

    if (albumError) {
      console.warn('Could not add album:', albumError);
    } else if (albumData) {
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

  const deleteAlbumImage = async (imagePath: string) => {
    const { error } = await supabase.storage.from('album_cover_images').remove([imagePath]);
    if (error) {
      console.error('Failed to delete album image:', error.message);
    }
  };

  const deleteAlbum = async(album: Partial<Album>) => {

    if (album.image_url) {
      deleteAlbumImage(album.image_url)
    }

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
