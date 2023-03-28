import { SignUp } from '../../lib/firebase/auth'
import { AuthForm } from './AuthForm';

export const UserSignUp = () => {
  	return (
		AuthForm(SignUp, "登録する")
	);
}

export default UserSignUp;
