import classNames from 'classnames/bind';
import { CheckUserLoggedIn } from 'components/Authentication';
import { Button } from 'components/ButtonCustomize';
import { FormGroup, Input, Label } from 'components/Form';
import { Meta } from 'components/Meta';
import { WrapperLink } from 'components/WrapperLink';
import { PATH } from 'constants/path';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useInputChange from 'hooks/useInputChange';
import { auth } from 'libs/firebase-app';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import styles from 'styles/SignIn.module.scss';
import { isAllFieldInObjectFilled } from 'utils/common';

const cx = classNames.bind(styles);

const SignInPage = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const { onChange } = useInputChange(formValues, setFormValues);

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAllInputFilled = isAllFieldInObjectFilled(formValues);
    if (!isAllInputFilled) {
      toast.error('Please fill all inputs');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formValues.email, formValues.password);
      toast.success('Sign in successfully!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <CheckUserLoggedIn>
      <Meta title="Sign In - TCinema" />
      <div className={cx('signIn-wrapper')}>
        <div className={cx('signIn-content')}>
          <form className={cx('signIn-form')} onSubmit={handleSignIn}>
            <h1 className={cx('signIn-heading')}>Welcome to TCinema</h1>
            <div className={cx('signIn-fields')}>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="email" placeholder="Email" onChange={onChange} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" onChange={onChange} />
              </FormGroup>
              <Button className={cx('signIn-btn', 'btn-large')}>Sign In</Button>
            </div>

            <div className={cx('signIn-alreadyAccount')}>
              Do not have an account? <WrapperLink href={PATH.signUp}>Sign Up Here</WrapperLink>
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

export default SignInPage;
