'use client';

import { useEffect, useState} from "react";

export default function Dashboard(){
    const [error, setError] = useState(null);

    useEffect(() => {
        try{
            //fetching user data

        }catch (err){
            setError("failed to load dashboard, try again");

        }
    },  []);

    return (
        <div>
            {error ? (
                <div>{error}</div>
            ) : (
                <div>Welcome to dashboard</div>
            )}
        </div>

    );
    }
