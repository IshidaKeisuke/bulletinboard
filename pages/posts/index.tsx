import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useEffect, useState } from "react";
import { NextPage } from 'next';
import Link from 'next/link';

const firebaseConfig = {
	apiKey: "AIzaSyB_Li4fMbOPGG-l4u7iruN1kkUaheNbnC4",
	authDomain: "bulletinboard-35ac7.firebaseapp.com",
	projectId: "bulletinboard-35ac7",
	storageBucket: "bulletinboard-35ac7.appspot.com",
	messagingSenderId: "814682607164",
	appId: "1:814682607164:web:fd6d6982aca87a3267fd39",
	measurementId: "G-L6QY5DJYRT"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const registerUser = async (email: string, password: string) => {
	try {
	  const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
	  const idToken = await userCredential.user?.getIdToken();
	  const userId = userCredential.user?.uid;
	  const userEmail = userCredential.user?.email;
	  if (idToken && userId && userEmail) {
		const graphqlEndpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT;
		const adminSecret = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET;
		console.log(graphqlEndpoint)
		console.log(adminSecret)
		if (!graphqlEndpoint || !adminSecret) {
		  throw new Error("Hasura endpoint or admin secret is missing.");
		}
		const query = `
		  mutation ($userId: String!, $userEmail: String) {
			insert_users(objects: [{
			  id: $userId,
			  email: $userEmail,
			  last_seen: "now()"
			}], on_conflict: {
			  constraint: users_pkey,
			  update_columns: [last_seen, email]
			}) {
			  affected_rows
			}
		  }
		`;
		const variables = { userId: userId, userEmail: userEmail };
		console.log(variables)
		const response = await fetch(graphqlEndpoint, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			"x-hasura-admin-secret": adminSecret,
			Authorization: `Bearer ${idToken}`,
		  },
		  body: JSON.stringify({ query, variables }),
		});
		if (!response.ok) {
		  throw new Error("Failed to send data to Hasura.");
		}
		console.log(response)
		return response;
	  }
	} catch (error) {
	  console.error(error);
	}
};

const Posts: NextPage = () => {
  const [idToken, setIdToken] = useState<string>("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken(true).then((idToken) => {
          setIdToken(idToken);
        });
      }
    });
  }, []);
  
  
  return (
    <div>
		<Link href="/">トップへ戻る</Link>
		<h1>Firebase Authentication and Hasura</h1>
		<form
		onSubmit={(event) => {
			event.preventDefault();
			const email = (document.getElementById("email") as HTMLInputElement).value;
			const password = (document.getElementById("password") as HTMLInputElement).value;
			registerUser(email, password);
		}}
		>
		<label htmlFor="email">Email</label>
		<input type="email" id="email" />
		<label htmlFor="password">Password</label>
		<input type="password" id="password" />
		<button
			onClick={(event) => {
				event.preventDefault();
				const email = (document.getElementById("email") as HTMLInputElement).value;
				const password = (document.getElementById("password") as HTMLInputElement).value;
				registerUser(email, password);
			}}
			>
			Register
		</button>
		</form>
    </div>
  );
}

export default Posts;
