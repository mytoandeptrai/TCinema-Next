import { CheckUserLoggedIn } from 'components/Authentication';
import { Meta } from 'components/Meta';
import useInputChange from 'hooks/useInputChange';
import React, { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { isAllFieldInObjectFilled } from 'utils/common';
import styles from 'styles/SignIn.module.scss';
import classNames from 'classnames/bind';
import { FormGroup, Input, Label } from 'components/Form';
import { Button } from 'components/ButtonCustomize';
import { WrapperLink } from 'components/WrapperLink';
import { PATH } from 'constants/path';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from 'libs/firebase-app';
import { defaultAvatar, userRole, userStatus } from 'constants/global';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const cx = classNames.bind(styles);

const SignUpPage = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { onChange } = useInputChange(formValues, setFormValues);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAllInputFilled = isAllFieldInObjectFilled(formValues);
    if (!isAllInputFilled) {
      toast.error('Please fill all inputs');
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      toast.error('Confirmation password do not match!');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, formValues.email, formValues.password);
      if (!auth.currentUser) return;

      await updateProfile(auth.currentUser, {
        photoURL: defaultAvatar
      });

      await setDoc(doc(db, 'users', auth.currentUser.uid as string), {
        uid: auth.currentUser.uid,
        photoURL: defaultAvatar,
        displayName: auth.currentUser.displayName || 'Unknown',
        email: formValues.email,
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: serverTimestamp(),
        follows: []
      });

      toast.success('Sign up successfully!');
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <CheckUserLoggedIn>
      <Meta title="Sign In - TCinema" />
      <div className={cx('signIn-wrapper')}>
        <div className={cx('signIn-content')}>
          <form className={cx('signIn-form')} onSubmit={handleSignUp}>
            <h1 className={cx('signIn-heading')}>Welcome to TCinema</h1>
            <div className={cx('signIn-fields')}>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email..."
                  onChange={onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter your password..."
                  onChange={onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  name="confirmPassword"
                  placeholder="Enter your confirm password..."
                  type="password"
                  onChange={onChange}
                />
              </FormGroup>
              <Button className={cx('signIn-btn', 'btn-large')}>Sign Up</Button>
            </div>

            <div className={cx('signIn-alreadyAccount')}>
              Have an account? <WrapperLink href={PATH.signIn}>Sign In Here</WrapperLink>
            </div>
            <WrapperLink href={PATH.resetPassword} className={cx('signIn-forgot')}>
              Forgot password?
            </WrapperLink>
          </form>
        </div>
      </div>
    </CheckUserLoggedIn>
  );
};

export default SignUpPage;
