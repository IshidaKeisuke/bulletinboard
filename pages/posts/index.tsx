import { useEffect, useState } from "react";
import { NextPage } from 'next';
import Link from 'next/link';
import { checkAuth } from "@/lib/firebase/auth";

const Posts: NextPage = () => {
	const authStatus = checkAuth();

	if (authStatus === "checking") {
		return <div>Checking Authentication Status...</div>;
	}

	if (authStatus === "notloggedin") {
		return(
			<div>You are not logged in. 
				<Link href="/">Please log in to see this page.</Link>
			</div>
		)
	}

	return (
		<div>
			<Link href="/">トップへ戻る</Link>
			<h1>Firebase Authentication and Hasura</h1>
			<p>ログイン成功しました</p>
		</div>
	);
}

export default Posts;
