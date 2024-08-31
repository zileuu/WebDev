'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FaGoogle, FaApple} from 'react-icons/fa';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = () => {
    const userData = { username, password};
    localStorage.setItem("user", JSON.stringify(userData));
    Cookies.set('username', username, {sameSite: 'strict'})
    router.push("/");
  };

  return(
    <div className="container">
    <h1>SignUp</h1>
    <form>
      <input
          type="text" placeholder="Username" value={username}
          onChange={(e) => setUsername(e.target.value)}/>
      <input
        type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)}/>
         <button type="button" onClick={handleSignup}>Signup</button>
      </form>
        <div className="social-login">
           
        <button><FaGoogle /> Login with Google
          </button>
          <button><FaApple /> Login with Apple
          </button>
        </div>
      </div>
  );
}