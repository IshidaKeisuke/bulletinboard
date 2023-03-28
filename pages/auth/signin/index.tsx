import React, { useState } from 'react';
import { NextPage } from 'next'
import Link from 'next/link';
import UserLogin from '../../../components/auth/SignIn'

const SignIn: NextPage = () => {
	return(
		<>
			<h2>サインイン</h2>
			<UserLogin />
		</>
	)
}

export default SignIn;
