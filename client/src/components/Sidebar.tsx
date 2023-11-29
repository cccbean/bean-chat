import tempAvatar from '../assets/Luffy-pic.png';

function Sidebar() {
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
				/>
			</div>

			<ul className="menu menu-vertical">
				<li>
					<div className="gap-4">
						<div className="avatar indicator">
							<span className="badge indicator-item badge-success badge-sm indicator-bottom -translate-x-[1px] -translate-y-[1px] border border-base-100"></span>
							<div className="w-16 rounded-full">
								<img src={tempAvatar} alt="Pic of Monkey D. Luffy" />
							</div>
						</div>
						<p className="text-lg">Monkey D. Luffy</p>
					</div>
				</li>
			</ul>
		</div>
	);
}

export default Sidebar;
