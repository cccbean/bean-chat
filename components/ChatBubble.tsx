import tempAvatar from '../assets/Luffy-pic.png';

type Props = {
	username: string;
	message: string;
	timestamp: string;
	orientation: 'chat-start' | 'chat-end';
};

function ChatBubble({ username, message, timestamp, orientation }: Props) {
	return (
		<div className={`chat ${orientation}`}>
			<div className="avatar chat-image">
				<div className="w-12 rounded-full">
					<img src={tempAvatar} alt="" />
				</div>
			</div>

			<div className="chat-header flex items-end gap-2">
				{orientation === 'chat-end' && <time className="text-xs opacity-50">{timestamp}</time>}
				{username}
				{orientation === 'chat-start' && <time className="text-xs opacity-50">{timestamp}</time>}
			</div>

			<div className="chat-bubble">{message}</div>

			<div className="chat-footer opacity-50">Delivered</div>
		</div>
	);
}

export default ChatBubble;
