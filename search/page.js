'use client'

import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

const artist = [
    'Adele',
    'Beyonce',
    'Coldplay',
    'Drake',
    'Ed Sheeran',
    'Lady Gaga',
    'Taylor Swift'
];

export default function SearchPage () {
    const [searchTerm,setSearchTerm]=useState("");
    const [results, setResults]= useState([]);
    const [user, setUser]= useState(null);

    useEffect(()=>{
        const username= Cookies.get("username");
        if(username){
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && storedUser.username === username) {
                setUser(storedUser);

            }

        }
    }, []);
    const handleSearch = async(event) =>{
        event.preventDefault();
        const filteredArtist = artist.filter((artist)=>
        artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const artistInfo = await Promise.all(filteredArtist.map(async (artist) => {
        try {
            const response = await fetch("/api/artist?name=${artist}");
            if (!response.ok){
                throw new Error("Artist ${artist} not found");

            }
            const info = await response.json();
            return{name: artist, info};} catch(error){
                return {name: artist, info:"No information available."};
            }

        }
    ));
    setResults(artistInfo);
    };

    if (!user){
        return <p>Loading...</p>;
    }
    return(
        <div className="container">
            <h1>Artist Search</h1>
            <form onSubmit={handleSearch}>
                <input type="text" value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} placeholder="Search for an artist"></input>
                <button type="submit">Search</button>
            </form>
            <ul>
                {results.map((artist, index)=>(
                    <li key={index}>
                        <h2>{artist.name}</h2>
                        <p>{artist.info}</p>
                    </li>

                ))}

            </ul>
        </div>
    );
    }
    
