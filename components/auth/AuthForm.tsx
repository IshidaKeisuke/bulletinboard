import { useState } from "react";

export const AuthForm = (AuthFunc, buttonName: string) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async(e: React.FormEvent) => {
		e.preventDefault();
		await AuthFunc(email, password)
	}
  
  	return (
    	<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email: </label>
					<input
					type="email"
					name="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password">Password: </label>
					<input
					type="password"
					name="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type='submit'>{buttonName}</button>
			</form>
		</div>
	);
};
