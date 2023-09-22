import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../utils/firebase";
import styles from "../../style";
import Loader from "../../components/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(""); 
    setLoading(true);

    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;
      console.log("User logged in:", user);
      
      setLoading(false); 
      // Display success message
      setSuccessMessage("Login successful. Redirecting...");

      // Add a delay before navigating to the Gallery page
      setTimeout(() => {
        navigate("/gallery");
      }, 1000); // Adjust the delay time (in milliseconds) as needed

    } catch (err) {
      setLoading(false);
      const errorCode = err.message;
      let errorMessage = "An error occurred. Please try again.";

      // Map Firebase error codes to custom error messages
      switch (errorCode) {
        case "Firebase: Error (auth/invalid-email).":
          errorMessage = "Invalid email address.";
          break;
        case "Firebase: Error (auth/user-not-found).":
          errorMessage = "User not found. Please sign up.";
          break;
        case "Firebase: Error (auth/invalid-login-credentials).":
          errorMessage = "Incorrect email or password. Please try again.";
          break;
        default:
          errorMessage = "An error occurred. Please try again.";
      }

    setError(errorMessage);
    }
  };

  return (
    <main className={`${styles.container} min-h-screen max-w-lg ${styles.padding} shadow-lg m-auto`}>
      <div>
        <h2 className={`${styles.heading2} text-center`}>Login</h2>
        <p className={`${styles.paragraph} text-center`}>Login to your account to see the photos</p>
        <form onSubmit={handleSubmit}>
          <div className={`${styles.formInputGroup}`}>
            <label htmlFor="email" className={`${styles.paragraph}`}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`${styles.formInput}`}
              value={form.email}
              onChange={handleFormChange}
            />
          </div>
          <div className={`${styles.formInputGroup}`}>
            <label htmlFor="password" className={`${styles.paragraph}`}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`${styles.formInput}`}
              value={form.password}
              onChange={handleFormChange}
            />
          </div>
          <div className={`${styles.formInputGroup}`}>
            <button type="submit" disabled={loading} className={`${styles.formInput} bg-blue-500 text-white font-bold hover:bg-blue-700 border-0 rounded-md p-2 outline-0`}>Login</button>
          </div>
        </form>
        {loading && (
          <div className="text-center">
            <Loader /> 
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center mt-2">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="text-green-500 text-center mt-2">
            {successMessage}
          </div>
        )}
      </div>
    </main>
  );
};

export default Login;
