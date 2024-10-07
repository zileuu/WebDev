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
     <table>
      <tr >
        <td >Floors 0 to 12(OFFER 1)</td>
        <td  >  Hostel share experience</td>
        <td >
          <h4><span class="label label-danger">Sold Out! </span></h4>
        </td>
      </tr>
      <tr>
        <td>Floors 13 to 26(OFFER 2) </td>
        <td>  Hotel private experience</td>
        <td><a href="/booking">Book now</a></td>
      </tr>
      <tr>
      <td>Floors 27 to 35(OFFER 3)</td>
        <td>  Hotel Luxury experience</td>
        <td><a href="/booking"> Book now</a></td>
      </tr>
      <tr>
      <td>Outside Area(OFFER 4)</td>
        <td>  Our campsite offer</td>
        <td><a href="/booking"> Book now</a></td>
      </tr>
      </table>
    </div>
    <main>
        <SessionProvider>
          {children}
        </SessionProvider></main>
      

        </body>



