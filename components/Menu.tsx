import { User } from '../App';

type Props = {
	user: User;
};

function Menu({ user }: Props) {
	return (
		<div className="flex w-min flex-col justify-between border-r border-base-content p-2">
			<div>
				<button className="btn">C</button>
				<button className="btn">F</button>
			</div>

			<div>
				<button className="btn">{user.username[0].toUpperCase()}</button>
				<button className="btn">E</button>
			</div>
		</div>
	);
}

export default Menu;
