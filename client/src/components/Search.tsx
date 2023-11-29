import { useState } from "react";
import { User } from "../App";
import { Socket } from "socket.io-client";

type Props = {
  user: User;
  socket: Socket;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function Search({user, socket, search, setSearch}: Props) {
  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setSearch(e.target.value);
    const data = {
      myId: user._id,
      query: e.target.value,
    }
		socket.emit('search-request', data);
	};

  return (
    <input
    className="input input-bordered grow rounded-full"
    type="search"
    id="search"
    name="search"
    value={search}
    onChange={handleSearch}
  />
  )
}

export default Search;