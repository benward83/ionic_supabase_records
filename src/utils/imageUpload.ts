import supabase from '../client/supabaseClient'

const uploadImage = async (fileBlob: Blob | string, bucketName: string) => {
  let blob: Blob;

  if (typeof fileBlob === 'string' && fileBlob.startsWith('blob:')) {
    const response = await fetch(fileBlob);
    blob = await response.blob();
  } else if (fileBlob instanceof Blob) {
    blob = fileBlob;
  } else {
    console.error('Invalid fileBlob type');
    return null;
  }

  const fileExtension = blob.type.split('/')[1];
  const filePath = `albums/${Date.now()}.${fileExtension}`;
  const { data, error } = await supabase
    .storage
    .from(bucketName)
    .upload(filePath, blob, {
      upsert: false,
    })

  if (error) {
    console.error('Upload failed:', error.message);
    return null;
  }

  if (data) {
    const { publicUrl } = supabase.storage.from('album_cover_images').getPublicUrl(filePath).data;
    return publicUrl
  }

};

export default uploadImage
