import { useState } from 'react';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';

export type User = {
	_id: string;
	username: string;
	isOnline: boolean;
	friends: string[];
}

function App() {
	const [token, setToken] = useState('');
	const [user, setUser] = useState<User>({_id: '', username: '', isOnline: false, friends: []});

	return (
		<>
			<BrowserRouter>
				<Routes>
					{token === '' ? (
						<Route path="/" element={<Login setToken={setToken} setUser={setUser} />} />
					) : (
						<Route path="/" element={<Chat token={token} user={user} />} />
					)}
					<Route path='/signup' element={<Signup />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
