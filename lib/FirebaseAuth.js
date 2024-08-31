import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";

const auth = getAuth();

export async function createUserWithEmailAndPassword(){
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Signed up 
        const user = userCredential.user;
        alert(`ID of new user: ${user.uid}`);
    } catch(error)  {
        alert(`ERROR: Code: ${error.code}, full message: ${error.message}`);
    }
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // We can get the user object again if we need it
        const user = userCredential.user;
        alert(`Logged in successfully! Email=${user.email}`);
    } catch(error)  {
        alert(`ERROR: Code: ${error.code}, full message: ${error.message}`);
    }
    try {
        await auth.signOut();
    } catch(error) {
        alert(`${error.code} ${error.message}`);
    }
    const profile = await updateProfile(user, {
        displayName: name
    });
     
     
    onAuthStateChanged(auth, user => {
        if(user) {
            document.getElementById('btnLogout').style.display = 'inline';
            document.getElementById('btnLogin').style.display = 'none';
        } else {
            document.getElementById('btnLogout').style.display = 'none';
            document.getElementById('btnLogin').style.display = 'inline';
        }
    });
    document.getElementById('btnAccessProtectedResource').addEventListener("click", e => {
        if(auth.currentUser) {
            alert(`${auth.currentUser.displayName || auth.currentUser.email}, here is your confidential information ....`);
        } else {
            alert("Cannot access - please login.");
        }
    })
}