'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FaGoogle} from 'react-icons/fa';
import { auth, provider, signInWithPopup } from '../lib/firebase';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';


export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const router = useRouter();
 



  
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        username: user.displayName,
        email: user.email,
        // You can store other details if needed
      };


      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      // Set username in cookies
      Cookies.set('username', user.displayName, { sameSite: 'strict' });

      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      alert('Google sign-in failed');
    }
  };
  

  const handleSignup = async () => {
    const result = await addDoc(user);
    const user = result.user;
   

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      username,
      password,
      address,
      dob,
    } ;
  

    // Set username in cookies
    Cookies.set('username', user.email, { sameSite: 'strict' });

    // Store in local storage
    localStorage.setItem('user', JSON.stringify(userData));
    Cookies.set('username', username, { sameSite: 'strict' });

    try {
      // Add a new document in Firestore
      const userQueryByEmail = query(
        collection(db, 'users'),
        where('email', '==', usernameOrEmail)
      );

      // Then by username
      const userQueryByUsername = query(
        collection(db, 'users'),
        where('username', '==', usernameOrEmail)
      );

      // Fetch both queries
      const querySnapshotByEmail = await getDocs(userQueryByEmail);
      const querySnapshotByUsername = await getDocs(userQueryByUsername);

      let userDoc = null;
// Check if we found a user by email
if (!querySnapshotByEmail.empty) {
  userDoc = querySnapshotByEmail.docs[0];
} 
// If not, check by username
else if (!querySnapshotByUsername.empty) {
  userDoc = querySnapshotByUsername.docs[0];
}

if (userDoc) {
  const userData = userDoc.data();
  // Verify password
  if (userData.password === password) {
    // Store user in local storage
    localStorage.setItem('user', JSON.stringify(userData));

    // Set username in cookies
    Cookies.set('username', userData.username, { sameSite: 'strict' });

    // Redirect to home page
    router.push('/');
  } else {
    alert('Invalid credentials');
  }
} else {
  alert('Invalid credentials');
}
} catch (error) {
console.error('Error Signning up:', error);
alert('Sign up failed');
}
};

  return (
    <div className="container">
      <h1>Signup</h1>
      <form>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <button type="submit" onClick={handleSignup}>Signup</button>
      </form>
      <div className="social-login">
      <button onClick={handleGoogleSignIn}>
          <FaGoogle /> Login with Google
        </button>
    
      </div>
    </div>
  );
}
