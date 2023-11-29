import { useEffect, useState } from 'react';
import tempAvatar from '../assets/Luffy-pic.png';
import { Socket } from 'socket.io-client';

type User = {
	_id: string;
	username: string;
	isOnline: boolean;
	friends: string[];
};

type Chat = {
	name: string;
	users: string[];
};

type Props = {
	socket: Socket;
};

function Sidebar({ socket }: Props) {
	const [chats, setChats] = useState<Chat[]>([
		{ name: 'Monkey D. Luffy', users: ['rosa', 'Monkey D. Luffy'] },
	]);
	const [userSearch, setUserSearch] = useState<User[]>([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		socket.on('chats', (data) => {
			console.log(data);
		});

		socket.on('search-response', (data) => {
			console.log(data);
			setUserSearch(data);
		})
	}, []);

	const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setSearch(e.target.value);
		socket.emit('search-request', e.target.value);
	};

	const createNewChat: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		// FIXME: e.target is whatever child of the button you clicked on
		const otherId = (e.target as HTMLButtonElement).dataset.id;
		console.log(otherId);
		setSearch('');
		setUserSearch([]);
		socket.emit('new-chat-request', otherId);
	}

	return (
		<div className="flex w-96 flex-col border-r border-base-content">
			<div className="flex items-center justify-between p-4">
				<h1 className="text-2xl">Chats</h1>
				<button className="btn">N</button>
			</div>

			<div className="flex px-4">
				<input
					className="input input-bordered grow rounded-full"
					type="search"
					id="search"
					name="search"
					value={search}
					onChange={handleSearch}
				/>
			</div>

			<ul className="menu menu-vertical">
				{userSearch.length === 0
					? chats.map((chat) => (
							<li>
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
					: userSearch.map((user) => (
							<li>
								<button className="gap-4" onClick={createNewChat} data-id={user._id}>
									<div className="avatar indicator">
										<span className="badge indicator-item badge-success badge-sm indicator-bottom -translate-x-[1px] -translate-y-[1px] border border-base-100"></span>
										<div className="w-16 rounded-full">
											<img src={tempAvatar} alt="Pic of Monkey D. Luffy" />
										</div>
									</div>
									<p className="text-lg">{user.username}</p>
								</button>
							</li>
					  ))}
			</ul>
		</div>
	);
}

export default Sidebar;
