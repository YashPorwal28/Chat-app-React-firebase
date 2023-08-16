import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebas'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Chats = () => {
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  // fetting conversation  from users , this is for left hand side, the chats has to update realtime
  // this has to be in realtime, so we used firebase snapshot
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
        // console.log("doc.data() " + doc);
        setChats(doc.data())
      })

      return () => {
        unsub()
      }
    }

    currentUser.uid && getChats()
  }, [currentUser.uid])

  // console.log(Object.entries(chats))
    // Object.entries(chats).map((chat)=>{
    //   console.log("chat "  + chat[1].userInfo.text)
    // })
  // console.log("chats " + Object.entries(chats))

  const handleSelect = u => {
    dispatch({ type: 'CHANGE_USER', payload: u })
  }
  // console.log(chats)
  return (

    <div className='chats'>
    
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className='userChat'
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} onClick={() => handleSelect(chat[1].userInfo)} alt='' />
          <div className='userChatInfo'>
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chats
