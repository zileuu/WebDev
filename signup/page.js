'use client';
import { useState} from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FaGoogle} from 'react-icons/fa';
import {  provider, provider2, signInWithPopup } from '../lib/firebase';

import { getAuth,  signInWithEmailAndPassword} from "firebase/auth";







export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const router = useRouter();
  const auth = getAuth()








  
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        username: user.displayName,
        email: user.email,
        // You can store other details if needed
      };D
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

  

  const handleSignup = async () => {
    try {
      const result = await  signInWithEmailAndPassword (auth, provider2);
      const user = result.user;
      const userData = {
        username: user.displayName,
        email: user.email,
        // You can store other details if needed
      };D
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      // Set username in cookies
      Cookies.set('username', user.displayName, { sameSite: 'strict' });

      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error during Email sign-in:', error);
      alert('Email sign-in failed');
    }
  };
   

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={Signup}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <button type="submit" onClick={handleSignup}>Signup</button>
      </form>
      <div className="social-login">
      <button onClick={handleGoogleSignIn}>
          <FaGoogle /> Login with Google
        </button>
    
      </div>
    </div>
  );
}
