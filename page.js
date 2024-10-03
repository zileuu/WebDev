'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
//import Cookies from 'js-cookie';

export default function Home() {
  

  return (
    <div>
      <h1 > HOTEL BOOKING SYSTEM</h1>
      <p>Logged in to enable search options</p>
      <p>Please login or signup</p>
      <Link href={"/signup"}>Go to SignUp</Link>
    </div>
  );
}
