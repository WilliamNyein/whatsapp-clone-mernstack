import React from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import {Avatar,IconButton} from '@material-ui/core'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from '../SidebarChat/SidebarChat';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <Avatar src='https://images.mubicdn.net/images/cast_member/2184/cache-2992-1547409411/image-w856.jpg?size=800x'/>
        <div className='sidebar-right'>
          <IconButton>
            <DonutLargeIcon/>
          </IconButton>
          <IconButton>
            <ChatIcon/>
          </IconButton>
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        </div>
      </div>
      <div className='sidebar-search'>
        <div className='search-container'>
          <SearchIcon/>
          <input type='text' className='search-input' placeholder='Search or start new chat'/>
        </div>
      </div>
      <div className='sidebar-chats'>
      <SidebarChat/>
      <SidebarChat/>
      <SidebarChat/>
      </div>
    </div>
  )
}

export default Sidebar
