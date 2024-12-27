import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context';

const Sidebar= () => {

    const [extended,seTExtened] = useState(false);    

    const{onSent,prevPrompts,setRecentPrompt,newChat} = useContext(Context)

    const loadPrompt = async (prompt) => {

        setRecentPrompt(prompt)
        await onSent(prompt)
    }
  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={()=>seTExtened(prev=>!prev)}className='menu' src={assets.menu_icon}/>
            <div onClick={()=>newChat()} className="new-chat"><img src={assets.plus_icon}/>
            {extended?<p>
                New Chat
            </p>:null}
            </div>


        {extended?
        <div className="recent">
            <p className='recent-title'>Recent</p>
            {prevPrompts.map((item, index) => {
  return (
    <div 
      key={index} // Add a unique key
      onClick={() => loadPrompt(item)} 
      className="recent-entry"
    >
      <img src={assets.message_icon} />
      <p>
        {item.slice(0, 18)}... {/* Display first 18 characters */}
      </p>
    </div>
  );
})}
        </div>:null}

         </div>


        <div className="bottom">
            <div className="bottom-item  recent-entry">
                <img src={assets.question_icon}/>
                {extended?<p>
                Help
                </p>:null}
            </div>

            <div className="bottom-item  recent-entry">
                <img src={assets.history_icon}/>
                {extended?<p>
                Activity
                </p>:null}
            </div>

            <div className="bottom-item  recent-entry">
                <img src={assets.setting_icon}/>
                {extended?<p>
                Settings
                </p>:null}
            </div>
        </div>
    </div>
  )
}

export default Sidebar