import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat';
import {useEffect,useState} from 'react'
import Pusher from 'pusher-js'
import axios from './axios';


function App() {
  const [messages,setMessages] = useState([])
  useEffect(()=>{
    const response =  axios.get('/messages/syn').then(
      res => setMessages(res.data)
    )
    //setMessages(response.data)
  },[])
  console.log(messages)

  useEffect(()=>{
    const pusher = new Pusher('a6f487752b150e5d0288', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data)=> {

      setMessages([...messages,data])
    });
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe()
    }
  },[messages])
  return (
    <div className="app">
      <div className='app-body'>
        <Sidebar/>
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
