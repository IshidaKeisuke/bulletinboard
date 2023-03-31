import { SignIn } from '../../lib/firebase/auth'
import { AuthForm } from './SignInForm';

export const UserSignIn = () => {
  	return (
		AuthForm(SignIn, "ログインする")
	);
}

export default UserSignIn;
