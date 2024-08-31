'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
//import Cookies from 'js-cookie';

export default function Home() {
  

  return (
    <div>
      <h1>Welcome to First Eliseu App</h1>
      <p>Logged in as Class project</p>
      <p>Please login or signup</p>
      <Link href={"/dashboard"}>Go to Dashboard</Link>
    </div>
  );
}
