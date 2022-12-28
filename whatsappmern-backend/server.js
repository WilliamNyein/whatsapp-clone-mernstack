import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'

//app config
const app = express()
const port = process.env. PORT || 9000

//middleware
app.use(express.json())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','*')
    next()
})
app.use(cors())

//pusher
const pusher = new Pusher({
    appId: "1530598",
    key: "a6f487752b150e5d0288",
    secret: "4d325e93de62eea46e96",
    cluster: "ap1",
    useTLS: true
  });

  const db = mongoose.connection;

  db.once('open',()=>{
  console.log('Db connected')

  const msgcollection = db.collection('messagecontents');
  const changeStream = msgcollection.watch();

  changeStream.on("change",(change)=>{console.log('change occur',change)
  if(change.operationType === 'insert'){
    const messageDetails = change.fullDocument;
    pusher.trigger('messages','inserted',{
        name:messageDetails.name,
        message:messageDetails.message,
        received:messageDetails.received
    })
  }else{
    console.log('Error triggering push')
  }})
  });



//db-connection
const connection_url ='mongodb+srv://williamnyein:thestudent@cluster0.11ixk2u.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(connection_url).then(()=>{
    app.listen(port,()=>console.log(`listening on port ${port}`))
}).catch(err=>console.log(err))

//api
app.get('/',(req,res)=>res.status(200).send("Hey it works!"))
app.get('/messages/syn',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})
app.post('/messages/new',(req,res)=>{
    const dbmessage = req.body;
    Messages.create(dbmessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})
//listen
