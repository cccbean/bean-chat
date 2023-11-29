import { useState } from "react";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function App() {
  const [token, setToken] = useState('');

	return (
		<>
    {token === '' ? <Login setToken={setToken} /> : <Chat token={token} />}
		</>
	);
}

export default App;
