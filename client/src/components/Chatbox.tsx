import tempAvatar from '../assets/Luffy-pic.png';

function Chatbox() {
  return (
    <div className="flex-1 flex flex-col">
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

        <div className='flex-1 p-2'>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className='w-12 rounded-full'>
                <img src={tempAvatar} alt="" />
              </div>
            </div>

            <div className="chat-header flex gap-2 items-end">
              Monkey D. Luffy
              <time className='text-xs opacity-50'>11:34</time>
            </div>

            <div className="chat-bubble">
              I'm gonna be King of the Pirates!
            </div>

            <div className="chat-footer opacity-50">
              Delivered
            </div>
          </div>

          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className='w-12 rounded-full'>
                <img src={tempAvatar} alt="" />
              </div>
            </div>

            <div className="chat-header flex gap-2 items-end">
              <time className='text-xs opacity-50'>11:34</time>
              Monkey D. Luffy
            </div>

            <div className="chat-bubble">
              No, me
            </div>

            <div className="chat-footer opacity-50">
              Delivered
            </div>
          </div>

        </div>

        <div className='flex gap-4 p-4 border-t border-base-content'>
          <button className='btn'>+</button>
          <input className='input input-bordered flex-1' type="text" id='message' name='message' />
          <button className='btn'>Send</button>
        </div>
			</div>
  )
}

export default Chatbox;