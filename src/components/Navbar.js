import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa"
import { auth } from '../firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
const Navbar = () => {
    const [user, loading] = useAuthState(auth)

    const signIn = () => {
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
    }

  return (
    <ul className='navbar' style={{ padding: "10px", color: "white" }}>
        <li style={{ color: "white" }}>StudyTimer</li>
        <li style={{ float: "right" }}>{user ? <FaSignOutAlt onClick={() => auth.signOut()} /> :<FaSignInAlt onClick={signIn} /> }</li>
    </ul>
  )
}

export default Navbar