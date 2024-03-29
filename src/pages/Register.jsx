import React, { useState } from 'react'
import Add from '../img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { auth, storage, db } from '../firebas'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async e => {
    setLoading(true)
    setErr(null);
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]
    console.log(file);
    try {
      //Create user      
        const res = await createUserWithEmailAndPassword(auth, email, password)
         
      // console.log(res)
      console.log("user created")
      //Create a unique image name
      const date = new Date().getTime()
      const storageRef = ref(storage, `${displayName + date}`)
   

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async downloadURL => {
          console.log(file);
          if(file == undefined){
            downloadURL = "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg";
          }

          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL
            })
            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            })

            //create empty user chats on firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {})
            navigate('/')
          } catch (err) {
            console.log(err)
            setErr(true)
            setLoading(false)
          }
        })
      })
    } catch (err) {
      setErr(err.message)
      // setLoading(false)
    }
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Inc.Chat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Name' />
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          <input style={{ display: 'none' }} type='file' id='file' />
          <label htmlFor='file'>
            <img className='poto' src={Add} alt='poto' />
            <span>Add an avatar</span>
          </label>
          <input type='submit' value='Register' />
          {err != null  && <span> {err}</span>}
        </form>
        <p>
          You do have an account ?<Link to = "/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
