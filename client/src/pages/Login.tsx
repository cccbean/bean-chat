import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../App';

type Props = {
	setToken: React.Dispatch<React.SetStateAction<string>>;
	setUser: React.Dispatch<React.SetStateAction<User>>;
};

function Login({ setToken, setUser }: Props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3500/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});
			if (!response.ok) {
				throw new Error(`This is an HTTP error: The status is ${response.status}`);
			}
			let data = await response.json();
			console.log(data);
			console.log(data.user.username[0])
			setToken(data.token);
			setUser(data.user);
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
				<div>
					Don't have an account?{' '}
					<Link className="link" to="/signup">
						Sign up
					</Link>
				</div>
			</form>
		</>
	);
}

export default Login;
