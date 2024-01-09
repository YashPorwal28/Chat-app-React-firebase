import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebas'
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

  const { currentUser } = useContext(AuthContext);

  console.log(currentUser)


  return (
    <div className='navbar'>
        <span className='logo'>INC.chat</span>
        <div className="user">
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
              {/* firebase signout functino */}
            <button onClick={()=>signOut(auth)}>LOGOUT</button>
        </div>

    </div>
  )
}

export default Navbar