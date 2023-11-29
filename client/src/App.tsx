import { useState } from 'react';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';

function App() {
	const [token, setToken] = useState('');

	return (
		<>
			<BrowserRouter>
				<Routes>
					{token === '' ? (
						<Route path="/" element={<Login setToken={setToken} />} />
					) : (
						<Route path="/" element={<Chat token={token} />} />
					)}
					<Route path='/signup' element={<Signup />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
