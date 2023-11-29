import { useState } from "react";

type Props = {
  setToken: React.Dispatch<React.SetStateAction<string>>
}

function Login({setToken}:Props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3000/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});
			if (!response.ok) {
				throw new Error(`This is an HTTP error: The status is ${response.status}`);
			}
			let data = await response.json();
			console.log(data);
      setToken(data.token);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<h1>Login</h1>
			<form className="max-w-sm" onSubmit={onSubmitHandler}>
				<div>
					<label className="label" htmlFor="username">
						<span className="label-text">Username</span>
					</label>
					<input
						className="input input-bordered"
						type="text"
						id="username"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div>
					<label className="label" htmlFor="password">
						<span className="label-text">Password</span>
					</label>
					<input
						className="input input-bordered"
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button className="btn btn-outline" type="submit">
					Login
				</button>
			</form>
		</>
	);
}

export default Login;
