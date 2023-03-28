import firebase from './firebsae_config';
import Router from 'next/router';

export const SignUp = async (email: string, password: string) => {
	try {
	  const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
	  const idToken = await userCredential.user?.getIdToken();
	  const userId = userCredential.user?.uid;
	  const userEmail = userCredential.user?.email;
	  if (idToken && userId && userEmail) {
		const graphqlEndpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT;
		const adminSecret = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET;
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

export const SignIn = async(email: string, password: string) => {
	try {
		const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
		const user = userCredential.user;
		Router.push('/')
		console.log(user)
		if(user){
			const idToken = await user.getIdToken();
		}
	} catch(error) {
		console.log(error)
	}
}
