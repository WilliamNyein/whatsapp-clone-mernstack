import React from 'react'
import { Avatar } from '@mui/material'
import './SidebarChat.css'

function SidebarChat() {
  return (
    <div className='sidebar-chat'>
        <Avatar/>
        <div className='sidebarchat-info'>
            <h2>Room Name</h2>
            <p>This is the last message</p>
        </div>
      
    </div>
  )
}

export default SidebarChat
