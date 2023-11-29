import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Menu from '../components/Menu';
import Sidebar from '../components/Sidebar';
import Chatbox from '../components/Chatbox';
import { User } from '../App';

type Props = {
	token: string;
	user: User;
};

export type Message = {
	_id: string;
	user: string;
	message: string;
	createdAt: string;
}

function Chat({ token, user }: Props) {
	const [messages, setMessages] = useState<Message[]>([]);
	const [chatId, setChatId] = useState('');
	const socket = io('http://localhost:3500', {
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
			<Menu user={user} />
			<Sidebar user={user} socket={socket} setMessages={setMessages} setChatId={setChatId} />
			<Chatbox user={user} socket={socket} messages={messages} setMessages={setMessages} chatId={chatId} />
		</div>
	);
}

export default Chat;
