import { createContext, useEffect, useState } from "react";
import { onAuthStageChanged, getTdTokenResult} from "firebase/auth"
import { auth } from "@/_lib/firebaseClientConfig.js"

export const FirebaseContext = createContext()

export function FirebaseProvider({children}){
    const [user,setUser] = useState(null)
    const [role, setRole] = useState("")
    const [loading, setLoading]= useState(true)
    const [token,setToken] = useState("")

    useEffect( function() {
        const unsubscribe = onAuthStageChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                getIdTokenResult(currentUser, true)
                    .then(getIdTokenResult);
            }
        }); {
            setToken(getIdTokenResult.token);
            setRole(getIdTokenResult.claims.role);

            console.log(
                "Token refreshed with latest claims");

        }
    })
        .catch((error) => {
        console.log("Error refreshing", error)

        })
                }
    
        return() => unsubscribe()

    , []
    return (
        <FirebaseContext.Provider value={{user, role, loading, token}}>
            {children}
        </FirebaseContext.Provider>

    )
