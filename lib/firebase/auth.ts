import Router from 'next/router';
import { useState, useEffect } from 'react';
import { createUser } from "@/lib/hasura/user";
import firebase from './firebsae_config';

export const SignUp = async (email: string, password: string) => {
    try {
		// Firebase Authenticationにメールアドレスとパスワードを登録する
		await firebase.auth().createUserWithEmailAndPassword(email, password);
  
		// メール送信設定
		const actionCodeSettings = {
		  url: process.env.NEXT_PUBLIC_APP_URL,
		  handleCodeInApp: true,
		};
  
		// 確認メールを送信する
		await firebase.auth().currentUser?.sendEmailVerification(actionCodeSettings);

		// Firebase Authenticationでログインしていない場合は自動でログインする
		if (!firebase.auth().currentUser) {
		  await firebase.auth().signInWithEmailAndPassword(email, password);
		}
  
		// Hasuraでユーザーを作成する
		await createUser({
		  userId: firebase.auth().currentUser?.uid,
		  userEmail: email,
		  initialUserName: initialUserName,
		  idToken: await firebase.auth().currentUser?.getIdToken()
		});
  
	  } catch (error) {
		console.error(error);
	  }
  
};

export const SignIn = async(email: string, password: string) => {
	try {
		const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
		const user = userCredential.user;
		if(user){
			const successfuleMessage = "ログインに成功しました"
			const idToken = await user.getIdToken();
			Router.push('/')
		}
	} catch(error) {
		console.log(error)
	}
}

export const checkAuth = () => {
	type AuthStatus = "checking" | "loggedin" | "notloggedin";
	const [authStatus, setAuthStatus] = useState<AuthStatus>("checking")
	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if(user){
				setAuthStatus('loggedin');
			} else {
				setAuthStatus("notloggedin");
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);
	return authStatus;
}
