import React,{useState} from 'react'
import './Chat.css'
import {Avatar,IconButton} from '@material-ui/core'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MicIcon from '@mui/icons-material/Mic';
import axios from '../axios'

function Chat({messages}) {
  const [input,setInput] = useState('');
  const sendMessage = async(e)=>{
    e.preventDefault();
    await axios.post('/messages/new',{
      message:input,
      name:"william",
      timestamp:"Just now",
      received:false
    })
    setInput('')
  }
  return (
    <div className='chat'>
      <div className='chat-header'>
      <Avatar/>
      <div className='chat-info'>
    <h3>Room Name</h3>
    <p>Last seen at...</p>
      </div>
      <div className='chat-buttons'>
        <IconButton><SearchIcon/></IconButton>
        <IconButton><AttachFileIcon/></IconButton>
        <IconButton><MoreVertIcon/></IconButton>
      </div>
    </div>
    <div className='chat-body'>
      {messages.map((message)=>
      (
      <p className={`chat-message ${message.received && 'chat-receiver'}`}>
        <span className='chat-name'>William Nyein</span>{message.message}
        <span className='chat-timestamp'>
          {message.timestamp}
        </span>
      </p>
      )
      )}
    </div>
    <div className='chat-footer'>
    <SentimentSatisfiedAltIcon/>
      <form>
        <input type='text' value={input} placeholder="Type a message"
        onChange={(e)=>setInput(e.target.value)} />
        <button onClick={sendMessage} type='submit'>Send a message</button>
      </form>
      <MicIcon/>
    </div>
    </div>
  )
}

export default Chat
