
           'use client'
import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FaGoogle} from 'react-icons/fa';
import { auth, provider, provider2,  signInWithPopup } from '../lib/firebase';
import {signInWithEmailAndPassword } from "firebase/auth";




export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [user, setUser] = useState(false)
  useEffect(() => {
    setUser(true)
  }, [])
 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result= await   signInWithEmailAndPassword(auth, provider2)
      const user=result.user;
      const userData={
        username:user.displayName,
        email: user.email,
      };      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      // Set username in cookies
      Cookies.set('username', user.displayName, { sameSite: 'strict' });

      // Redirect to home page
      router.push('/');
      // Redirect or show a success message
    } catch(error) {
      console.error(error);
      
  }};
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        username: user.displayName,
        email: user.email,
        // You can store other details if needed
      };


      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      // Set username in cookies
      Cookies.set('username', user.displayName, { sameSite: 'strict' });

      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      alert('Google sign-in failed');
    }
  };
  

  return (
    <div className="container">
      <h1>Login</h1>
      <h2>{user ? 'This is never prerendered' : 'Prerendered'}</h2>

      <form onSubmit={Login}>
        <input
          type="text"
          placeholder="Username or Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
      <div className="social-login">
        <button onClick={handleGoogleSignIn}>
          <FaGoogle /> Login with Google
   </button>
      </div>
    </div>
  );
}
