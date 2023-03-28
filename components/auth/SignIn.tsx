import { SignIn } from '../../lib/firebase/auth'
import { AuthForm } from './AuthForm';

export const UserSignIn = () => {
  	return (
		AuthForm(SignIn, "ログインする")
	);
}

export default UserSignIn;
