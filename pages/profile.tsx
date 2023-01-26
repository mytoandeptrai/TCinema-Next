import classNames from 'classnames/bind';
import { ProtectedRoute } from 'components/Authentication';
import { Button } from 'components/ButtonCustomize';
import { FormGroup, Input, Label } from 'components/Form';
import { Meta } from 'components/Meta';
import { UploadAvatar } from 'components/Upload';
import { doc, updateDoc } from 'firebase/firestore';
import useInputChange from 'hooks/useInputChange';
import { LayoutPrimary } from 'layouts';
import { db } from 'libs/firebase-app';
import { AsideUser } from 'modules/AsideUser';
import React, { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppSelector } from 'stores';
import styles from 'styles/Profile.module.scss';

const cx = classNames.bind(styles);

const ProfilePage = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [values, setValues] = useState({
    displayName: currentUser?.displayName || ''
  });

  const { onChange } = useInputChange(values, setValues);

  const handleUpdateProfile = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        if (!currentUser || !currentUser.uid) return;
        const colRef = doc(db, 'users', currentUser.uid);
        await updateDoc(colRef, values);
        toast.success('Update profile successfully!');
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
    [currentUser, values]
  );

  return (
    <ProtectedRoute>
      <Meta title="Profile - TCinema" />
      <LayoutPrimary>
        <div className={cx('container')}>
          <section className={cx('profilePage-container')}>
            <AsideUser />
            <div className={cx('profilePage-content')}>
              <h1 className={cx('profilePage-heading')}>Account information</h1>
              <span className={cx('profilePage-subHeading')}>Update your account information</span>
              <div className={cx('profilePage-details')}>
                <form className={cx('profilePage-form')} onSubmit={handleUpdateProfile}>
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      disabled
                      placeholder="Input email"
                      defaultValue={currentUser?.email}
                      onChange={onChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="displayName">Fullname</Label>
                    <Input
                      type="text"
                      name="displayName"
                      value={values.displayName}
                      placeholder="Fullname"
                      onChange={onChange}
                    />
                  </FormGroup>
                  <Button type="submit" className={cx('aside-btn')}>
                    Update
                  </Button>
                </form>
                <div className={cx('aside-uploadAvatar')}>
                  <UploadAvatar />
                </div>
              </div>
            </div>
          </section>
        </div>
      </LayoutPrimary>
    </ProtectedRoute>
  );
};

export default ProfilePage;
