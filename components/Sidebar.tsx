import { useEffect, useState } from 'react';
import tempAvatar from '../assets/Luffy-pic.png';
import { Socket } from 'socket.io-client';
import { User } from '../App';
import Search from './Search';
import { Message } from '../pages/Chat';

export type Chat = {
	_id: string;
	name: string;
	users: string[];
};

type Props = {
	user: User;
	socket: Socket;
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	setChatId: React.Dispatch<React.SetStateAction<string>>;
};

function Sidebar({ user, socket, setMessages, setChatId }: Props) {
	const [chats, setChats] = useState<Chat[]>([]);
	const [userSearch, setUserSearch] = useState<User[]>([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		socket.on('chats', (data) => {
			console.log(data);
			setChats(data);
		});

		socket.on('search-response', (data) => {
			console.log(data);
			setUserSearch(data);
		});

		socket.on('get-chat-response', (data) => {
			console.log(data);
			setMessages(data);
		});
	}, []);

	const getChat = (data: { myId: string; chatId: string }) => {
		socket.emit('get-chat-request', data);
	};

	return (
		<div className="flex w-96 flex-col border-r border-base-content">
			<div className="flex items-center justify-between p-4">
				<h1 className="text-2xl">Chats</h1>
				<button className="btn">N</button>
			</div>

			<div className="flex px-4">
				<Search user={user} socket={socket} search={search} setSearch={setSearch} />
			</div>

			<ul className="menu menu-vertical">
				{userSearch.length === 0
					? chats.map((chat) => (
							<li
								key={chat._id}
								onClick={() => {
									setChatId(chat._id);
									const data = {
										myId: user._id,
										chatId: chat._id,
									};
									getChat(data);
								}}
							>
								<div className="gap-4">
									<div className="avatar indicator">
										<span className="badge indicator-item badge-success badge-sm indicator-bottom -translate-x-[1px] -translate-y-[1px] border border-base-100"></span>
										<div className="w-16 rounded-full">
											<img src={tempAvatar} alt="Pic of Monkey D. Luffy" />
										</div>
									</div>
									<p className="text-lg">{chat.name}</p>
								</div>
							</li>
					  ))
					: userSearch.map((otherUser) => (
							<li
								key={otherUser._id}
								onClick={(e) => {
									const data = {
										myId: user._id,
										otherId: otherUser._id,
									};
									socket.emit('new-chat-request', data);

									setSearch('');
									setUserSearch([]);
								}}
							>
								<div className="gap-4" onClick={(e) => {}}>
									<div className="avatar indicator">
										<span className="badge indicator-item badge-success badge-sm indicator-bottom -translate-x-[1px] -translate-y-[1px] border border-base-100"></span>
										<div className="w-16 rounded-full">
											<img src={tempAvatar} alt="Pic of Monkey D. Luffy" />
										</div>
									</div>
									<p className="text-lg">{otherUser.username}</p>
								</div>
							</li>
					  ))}
			</ul>
		</div>
	);
}

export default Sidebar;
