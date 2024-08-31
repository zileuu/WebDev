'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './style.css';
import {inter} from "next/font/google";


export default function Layout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = Cookies.get('username');
    if (username) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.username === username) {
        setUser(storedUser);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('username');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <html>
      <body>
        <div>
    
          <header>
            <nav>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/search">Search</Link>
              {user ? (
                <>
                  <span>Welcome, {user.username}</span>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login">Login</Link>
                  <Link href="/signup">Signup</Link>
                </>
              )}
            </nav>
          </header>
          <main>{children}</main>
      
        </div>
      
      </body>
     
    </html>
  );
}
