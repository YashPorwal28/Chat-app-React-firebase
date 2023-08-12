import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebas'

const Navbar = () => {
  return (
    <div className='navbar'>
        <span className='logo'>INC.chat</span>
        <div className="user">
            <img src="https://images.pexels.com/photos/15679513/pexels-photo-15679513/free-photo-of-light-fashion-man-love.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" alt="" />
            <span>JOHN</span>
              {/* firebase signout functino */}
            <button onClick={()=>signOut(auth)}>LOGOUT</button>
        </div>

    </div>
  )
}

export default Navbar