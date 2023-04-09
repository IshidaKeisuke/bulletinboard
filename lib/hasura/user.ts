// import * as functions from 'firebase-functions';

const graphqlEndpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT;
const adminSecret = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET;
type createUserProps = {
	userId: string
	userEmail: string | null
	iniUserName: string
	idToken: string
}

type getUserProps = {
	userId: string;
	idToken: string;
};

export const createUser = async ({ userId, userEmail, iniUserName, idToken }: createUserProps) => {
	try {
		if (!graphqlEndpoint || !adminSecret) {
			throw new Error("Hasura endpoint or admin secret is missing.");
		}
		const query = `
		mutation ($userId: String!, $userEmail: String!, $name: String!) {
			insert_users(objects: [{
				id: $userId,
				email: $userEmail,
				name: $name,
				last_seen: "now()"
			}], on_conflict: {
				constraint: users_pkey,
				update_columns: [last_seen, email]
			}) {
				affected_rows
			}
		}
		`;
		const variables = { userId: userId, userEmail: userEmail, iniUserName: iniUserName };
		const response = await fetch(graphqlEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-hasura-admin-secret": adminSecret,
				Authorization: `Bearer ${idToken}`,
			},
			body: JSON.stringify({ query: query, variables: variables }),
		});
		return response;
	}
	catch (error) {
		console.error(error);
	}
}

export const getUser = async ({ userId, idToken }: getUserProps) => {
	try {
	  if (!graphqlEndpoint) {
		throw new Error("Hasura endpoint is missing.");
	  }
	  const query = `
		query getUser($userId: String!) {
		  users_by_pk(id: $userId) {
			name
		  }
		}
	  `;
	  const variables = { userId: userId };
	  console.log(variables)
	  const response = await fetch(graphqlEndpoint, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  "x-hasura-admin-secret": adminSecret,
		  Authorization: `Bearer ${idToken}`,
		},
		body: JSON.stringify({ query: query, variables: variables }),
	  });
	  console.log(response);
	  const data = await response.json();
	  console.log(data)
	  return data?.data?.users_by_pk?.name
	} catch (error) {
	  console.error(error);
	}
};

// export const onUserCreated = functions.auth.user().onCreate(async (user) => {
// 	try {
// 		await createUserInHasura(user.uid, user.email!);
// 		console.log(`User created in Hasura: ${user.uid}`);
// 	} catch (error) {
// 		console.error('Error creating user in Hasura:', error);
// 		throw new functions.https.HttpsError('internal', error.message);
// 	}
// });

// const ADD_USER_MUTATION = `
// mutation AddUser($id: String!, $email: String!) {
//   insert_users_one(object: {id: $id, email: $email}) {
//     id
//     email
//   }
// }
// `;

// // Send a request to Hasura GraphQL API
// async function requestHasura(query: string, variables: any = {}) {
// 	const response = await fetch(graphqlEndpoint, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'X-Hasura-Admin-Secret': adminSecret,
// 		},
// 		body: JSON.stringify({ query: query, variables: variables }),
// 	});

// 	if (!response.ok) {
// 		throw new Error(`Request to Hasura failed with status: ${response.status}`);
// 	}

// 	const responseBody = await response.json();

// 	if (responseBody.errors) {
// 		throw new Error(`GraphQL errors: ${JSON.stringify(responseBody.errors)}`);
// 	}

// 	return responseBody.data;
// }

// // Function to create a new user in Hasura
// async function createUserInHasura(id: string, email: string) {
// 	const variables = { id, email };
// 	return await requestHasura(ADD_USER_MUTATION, variables);
// }
