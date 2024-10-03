'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { db } from '../lib/firebase'; // Adjust the path as necessary
import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from "next/image";
import Link from 'next/link';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
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

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
    if (searchTerm == "Hotel"){
      setResults([{ name: 'Hotel', imageURL: "img/hotel1.png", bio: 'Our Hotel have a lot of diferents options and promotions that includ te package.' }]);

    }
    if (searchTerm == "Hostel"){
      setResults([{ name: 'Hostel', imageURL: "img/hostel1.jpg", bio: 'The hostel part offers sharing rooms ith afordable prices' }]);

    }
    if (searchTerm == "Campsite"){
      setResults([{ name: 'Campsite', imageURL: "img/campsite1.png", bio: 'Our outside patio offer camping packages' }]);

    }

    try {
      const artistsRef = collection(db, 'artists');
      const q = query(artistsRef, where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'));
      const querySnapshot = await getDocs(q);

      const artistInfo = querySnapshot.docs.map(doc => ({
        name: doc.data().name,
        imageURL: doc.data().imageURL,
        bio: doc.data().bio || 'No information available.',
      }));
      setResults(artistInfo);

   
    } catch (error)
     {
    
     console.log("Not found type again between Hotel,Hostel or Campsite, remember to use first capital letter!!!")
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container1">
      <h1> Search Panel</h1>
      <form onSubmit={handleSearch} className="artist-search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="***Please write with fist letter Capital*** Choose between:Hotel,Hostel or Campsite..."
        />
        <button type="submit">Search</button>
      </form>
      <table >
<tr >
<th> <u>HOTEL</u></th>
<th> <u>HOSTEL</u></th>
<th><u>CAMPSITES</u></th>

</tr>
<tr>
<td><center><Image
 src="img/hotel1.png"
 alt="Sunset"
 width={450}
 height={450}
 unoptimized={true}
 loading="eager"
 layout="fixed"
/></center></td>
<td ><center><Image
 src="img/hostel1.jpg"
 alt="Sunset"
 width={450}
 height={450}
 unoptimized={true}
 loading="eager"
 layout="fixed"
/> </center></td>
<td ><center><Image
 src="img/campsite1.png"
 alt="Sunset"
 width={450}
 height={450}
 unoptimized={true}
 loading="eager"
 layout="fixed"
/> </center></td>
</tr>
</table> 
      <ul>
        <div className="artist-gallery">
          {results.map((artist, index) => (
            <div key={index} className="artist-card">
              <img src={artist.imageURL} alt={artist.name} />
              <h2>{artist.name}</h2>
              <p>{artist.bio}</p>
              <Link href="/booking">BOOK NOW</Link>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}
