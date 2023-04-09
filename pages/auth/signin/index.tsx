import React, { useState } from 'react';
import { NextPage } from 'next'
import Link from 'next/link';
import UserLogin from '../../../components/auth/SignIn'

const SignIn: NextPage = () => {
	return(
		<>
			<Link href="/">トップへ</Link>
			<UserLogin />
		</>
	)
}

export default SignIn;
