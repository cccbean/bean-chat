import { useEffect } from "react";
import { io } from "socket.io-client";

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
    })
  }, [])

	return (
		<div className="flex h-screen overflow-hidden">
			
		</div>
	);
}

export default Chat;
