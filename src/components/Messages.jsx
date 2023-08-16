import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { onSnapshot , doc } from 'firebase/firestore'
import { db } from '../firebas'

const Messages = () => {



  // const [messages, setMessages ] = useState([])
  // const {data} = useContext(ChatContext);

  //   useEffect(()=>{
  //     const unsub = onSnapshot(doc(db, "chats",data.chatId),(doc)=>{
  //       doc.exists() && setMessages(doc.data().messages);
  //     })

  //     return ()=>{
  //       unsub()
  //     }
  //   },[data.chatId])

  //   // messages.map((m)=>{
  //   //   console.log("message "  + m)
  //   // })
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  // console.log(messages)



  return (
    // <div className="Messages">
    //   {/* {messages.map((m)=>{      
    //     <Message message = {m} key={m.id} />
    //   })} */}
    
    //     {messages.map((m)=>{
    //       <Message message={m} key = {m.id}/>
    //     })}


    // </div>
    <div className='Messages'>
      {/* <p>ntohuenh</p> */}
      {messages.map((m)=>{
        return(
          <Message message={m} key={m.id} />
        )
      })}
    </div>
  )
}

export default Messages;