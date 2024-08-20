import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export const addImageToStorage = async (file: File) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);

    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    throw new Error(error as string);
  }
};
