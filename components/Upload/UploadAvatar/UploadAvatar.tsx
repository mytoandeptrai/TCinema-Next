import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'libs/firebase-app';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppSelector } from 'stores';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { UploadImage } from '../UploadImage';

const UploadAvatar = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(currentUser?.photoURL || '');

  const deleteAvatarHandler = useCallback(async () => {
    try {
      if (!currentUser) return;
      const colRef = doc(db, 'users', currentUser.uid);
      await updateDoc(colRef, {
        photoURL: ''
      });
      setAvatar('');
    } catch (error: any) {
      toast.error(error?.message);
    }
  }, [currentUser]);

  const uploadAvatarHandler = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        const files = e.target.files;
        if (!files || !files[0].name || !currentUser) return;

        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + files[0].name);
        await uploadBytesResumable(storageRef, files[0]);
        const newAvatar = await getDownloadURL(storageRef);
        const colRef = doc(db, 'users', currentUser.uid);
        await updateDoc(colRef, { photoURL: newAvatar });
        toast.success('Update avatar successfully!');
        setAvatar(newAvatar);
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
    [currentUser]
  );

  return (
    <UploadImage
      name="photoURL"
      image={avatar}
      handleDeleteImage={deleteAvatarHandler}
      handleUploadImage={uploadAvatarHandler}
    />
  );
};

export default UploadAvatar;
