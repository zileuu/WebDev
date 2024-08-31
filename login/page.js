'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FaGoogle, FaApple} from 'react-icons/fa';
import {auth, provider, signInWithPopup} from "../lib/firebase";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.usename === username && storedUser.password === password) {
      Cookies.set('username', username, { sameSite: 'strict'});
      router.push('/');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleGoogleSignIn = async () => {
    try{
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        Cookies.set("username", user.displayName, {sameSite: "strict"});
        router.push("/");
    } catch(error){
        console.error("Error during Google sign-in:", error);
        alert("Google sign-in failed");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form>
        <input
            type="text" placeholder="Username" value={username}
            onChange={(e) => setUsername(e.target.value)}/>
        <input
          type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}/>
          <button type="button" onClick={handleLogin}>Login</button>
      </form>
        <div className="social-login">
          <button onClick={handleGoogleSignIn}><FaGoogle /> Login with Google
          </button>
          <button><FaApple /> Login with FaApple
          </button>
        </div>
      </div>
  );
}