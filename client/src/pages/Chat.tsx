import { useEffect } from 'react';
import { io } from 'socket.io-client';
import Menu from '../components/Menu';
import Sidebar from '../components/Sidebar';
import Chatbox from '../components/Chatbox';

type Props = {
	token: string;
};

function Chat({ token }: Props) {
	const socket = io('http://localhost:3000', {
		auth: {
			token,
		},
	});

	useEffect(() => {
		socket.on('hola', (data) => {
			console.log(data);
		});
	}, []);

	return (
		<div className="flex h-screen overflow-hidden">
			<Menu />
			<Sidebar />
			<Chatbox />
		</div>
	);
}

export default Chat;
