import { NextPage } from "next"
import { UserSignUp } from "@/components/auth/SignUp"

const SignUp: NextPage = () => {
	return(
		<>
			<h2>会員登録する</h2>
			<UserSignUp />
		</>
	)
}

export default SignUp
