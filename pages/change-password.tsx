import classNames from 'classnames/bind';
import { ProtectedRoute } from 'components/Authentication';
import { Button } from 'components/ButtonCustomize';
import { FormGroup, InputPassword, Label } from 'components/Form';
import { Meta } from 'components/Meta';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { LayoutPrimary } from 'layouts';
import { auth } from 'libs/firebase-app';
import { AsideUser } from 'modules/AsideUser';
import React, { FormEvent, useCallback, useReducer } from 'react';
import { toast } from 'react-hot-toast';
import styles from 'styles/ChangePassword.module.scss';
import { isAllFieldInObjectFilled } from 'utils/common';

const cx = classNames.bind(styles);

const ChangePassword = () => {
  const [inputValue, updateInputValueHandler] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    { password: '', newPassword: '', confirmPassword: '' }
  );

  const handleChangePassword = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        if (inputValue.newPassword !== inputValue.confirmPassword) {
          toast.error('Password not same!');
          return;
        }

        if (auth?.currentUser) {
          const credential = EmailAuthProvider.credential(
            auth?.currentUser?.email as string,
            inputValue.password
          );
          await reauthenticateWithCredential(auth?.currentUser, credential);
          await updatePassword(auth?.currentUser, inputValue.newPassword);
          toast.success('Change password successfully!');
        }
        
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
    [inputValue]
  );

  return (
    <ProtectedRoute>
      <Meta title="Password - TCinema" />
      <LayoutPrimary>
        <div className="container">
          <div className={cx('changePasswordPage-container')}>
            <AsideUser />

            <div className={cx('changePasswordPage-details')}>
              <h1 className={cx('changePasswordPage-heading')}>Change password</h1>
              <span className={cx('changePasswordPage-subHeading')}>Update your password</span>
              <form className={cx('changePasswordPage-form')} onSubmit={handleChangePassword}>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <InputPassword
                    name="password"
                    placeholder="Input password"
                    onChange={(e) => updateInputValueHandler({ password: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="newPassword">New password</Label>
                  <InputPassword
                    name="newPassword"
                    placeholder="Input new password"
                    onChange={(e) => updateInputValueHandler({ newPassword: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="confirmPassword">Confirm new password</Label>
                  <InputPassword
                    name="confirmPassword"
                    placeholder="Input confirm new password"
                    onChange={(e) => updateInputValueHandler({ confirmPassword: e.target.value })}
                    required
                  />
                </FormGroup>
                <Button
                  type="submit"
                  className={cx('changePasswordPage-btn')}
                  disabled={!isAllFieldInObjectFilled(inputValue)}
                >
                  Change password
                </Button>
              </form>
            </div>
          </div>
        </div>
      </LayoutPrimary>
    </ProtectedRoute>
  );
};

export default ChangePassword;
