import styles from "../style"
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../utils/firebase";

const Header = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        const auth = getAuth(app);
        signOut(auth)
            .then(() => {
                navigate("/");
            }).catch((error) => {
                console.log(error);
                alert("Sign-out failed. Please try again.");
        });
    }
    
  return (
    <header className={`${styles.padding} flex justify-between`}>
        <h2 className={`${styles.heading2}`}>Gallery</h2>
        <button className="text-blue-500 font-bold hover:text-blue-400" onClick={handleSignOut}>Sign Out</button>
    </header>
  )
}

export default Header