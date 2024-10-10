'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './style.css';
import { SessionProvider } from "next-auth/react"


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
              <Link href="/signup">SignUp</Link>
              <Link href="/booking">Booking</Link>

            </>
          )}
        </nav>
      </header>

      < >
        <h3 >Floors 0 to 12(OFFER 1)</h3>
        <h3  >  Hostel share experience</h3>
     
          <h3><span >Sold Out! </span></h3>
    
      </> <br/>
      <>
        <h3>Floors 13 to 26(OFFER 2) </h3>
        <h3>  Hotel private experience</h3>
        <h3><a href="/booking">Book now</a></h3>
      </> <br/>
      <>
      <h3>Floors 27 to 35(OFFER 3)</h3>
        <h3>  Hotel Luxury experience</h3>
        <h3><a href="/booking"> Book now</a></h3>
      </> <br/>
      <>
      <h3>Outside Area(OFFER 4)</h3>
        <h3>  Our campsite offer</h3>
        <h3><a href="/booking"> Book now</a></h3>
      </> <br/>
   
    </div>


    <main>
        <SessionProvider>
          {children}
        </SessionProvider></main> </body></html>
      
        )
}
