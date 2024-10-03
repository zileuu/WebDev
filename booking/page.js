'use client'

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { db } from '../lib/firebase'; // Adjust the path as necessary









export default function Home() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [user, setUser] = useState(null);


    async function handleSubmit(e) {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          try {
            const response = await fetch('/api/hotel', {
              method: 'post',
              body: new URLSearchParams(data),
            });
            if (!response.ok) {
              throw new Error(`Invalid response: ${response.status}`);
            }
            alert('Thanks for booking with us, we will get back to you soon!');
          } catch (err) {
            console.error(err);
            alert("We can't booking the form, try again later?");
          }
            
      console.log(data,'Booking request:', selectedDate, selectedTime);
        }
    
       useEffect(() => {
        const username = Cookies.get('username');
        if (username) {
          const storedUser = JSON.parse(localStorage.getItem('user'));
          if (storedUser && storedUser.username === username) {
            setUser(storedUser);
          }
        }
      }, [selectedDate]);


    
       if (!user) {
        return <p>Log in First to Complete booking!!</p>;
      }
    
  
   
  return (
      <div>
          <h1>Booking System</h1>
          <form className="container" onSubmit={handleSubmit}>
              <label htmlFor="date">Select Date:</label>
              <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
              />
              <br />
              <label htmlFor="time">Select Time:</label>
              <input
                  type="time"
                  id="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
              />
              <br />
              <div className="offer block">
        <label htmlFor="frm-offer">****OFFER NUMBER****</label>
        <input
          id="frm-offer"
          type="offer"
          name="offer"
          autoComplete="offer"
          required
        />
      </div>
           
      <div className="email block">
        <label htmlFor="frm-email">Email</label>
        <input
          id="frm-email"
          type="email"
          name="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="block phone">
        <label htmlFor="frm-phone">Phone</label>
        <input
          id="frm-phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          required
        />
      </div>
      <div className="name block">
        <div>
          <label htmlFor="frm-first">First Name</label>
          <input
            id="frm-first"
            type="text"
            name="first"
            autoComplete="given-name"
            required
          />
        </div>
        <div>
          <label htmlFor="frm-last">Last Name</label>
          <input
            id="frm-last"
            type="text"
            name="last"
            autoComplete="family-name"
            required
          />
        </div>
      </div>
      <div >
        <label htmlFor="frm-message">Message</label>
        <textarea id="frm-message" rows="6" name="message"></textarea>
      </div>
      <div className="button block">
        <button type="submit" onClick={handleSubmit} >Booking</button>
      </div>
           
          </form>

      </div>
  );
}
          
