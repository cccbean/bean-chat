import { useEffect, useState } from 'react';
import { User } from '../App';
import tempAvatar from '../assets/Luffy-pic.png';
import { Message } from '../pages/Chat';
import ChatBubble from './ChatBubble';
import { Socket } from 'socket.io-client';

type Props = {
	user: User;
	messages: Message[];
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	chatId: string;
	socket: Socket;
};

function Chatbox({ user, messages, setMessages, chatId, socket }: Props) {
	const [newMessage, setNewMessage] = useState('');

	useEffect(() => {
		socket.on('help', (data) => {
			console.log(data);
			const newMessages = [...messages];
			newMessages.push(data);
			setMessages(newMessages);
		});
	}, []);

	const sendMessage: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const data = {
			user: user._id,
			chat: chatId,
			message: newMessage,
		};
		socket.emit('new-message-request', data);
    setNewMessage('');
	};

	return (
		<div className="flex flex-1 flex-col">
			<div className="navbar flex justify-between border-b border-base-content">
				<div>
					<a className="btn btn-ghost text-xl" href="">
						Monkey D. Luffy
					</a>
				</div>

				<div>
					<button className="btn btn-ghost">...</button>
				</div>
			</div>

			<div className="flex-1 p-2">
				{messages.map((message) => (
					<ChatBubble
            key={message._id}
						username={message.user}
						message={message.message}
						timestamp={message.createdAt}
						orientation="chat-start"
					/>
				))}
				<ChatBubble
					username="Monkey D. Luffy"
					message="I'm gonna be King of the Pirates"
					timestamp="14:47"
					orientation="chat-start"
				/>
			</div>

			<form className="flex gap-4 border-t border-base-content p-4" onSubmit={sendMessage}>
				<button className="btn">+</button>
				<input
					className="input input-bordered flex-1"
					type="text"
					id="message"
					name="message"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
				/>
				<button className="btn" type="submit">
					Send
				</button>
			</form>
		</div>
	);
}

export default Chatbox;
