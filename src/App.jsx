import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, Gallery} from './pages'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from "./utils/firebase";


function App() {
  const auth = getAuth(app);

  // Define a state variable to track the user's login status
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        console.log('User is logged in:', user);
        setUserLoggedIn(true); 
      } else {
        // User is signed out.
        console.log('User is not logged in.');
        setUserLoggedIn(false);
      }
    });

    return unsubscribe; // Cleanup function to unsubscribe from the observer
  }, [auth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route
          path="/gallery"
          element={
            userLoggedIn ? (
              <Gallery />
            ) : (
              // Redirect unauthenticated users to the login page
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
