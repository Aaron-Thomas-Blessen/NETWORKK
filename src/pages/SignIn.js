import React, { useState } from "react";
import { auth, db } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "../components/nav";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ClipLoader from "react-spinners/ClipLoader";

// Validation schema using Yup
const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  // Added loading state
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const email = watch('email'); // Watch the email input value

  const reset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("If your email is registered with us, you will receive a password reset email shortly.");
        console.log("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessage(errorCode.substr(5, errorCode.length - 1));
        console.log(errorCode, errorMessage);
      });
  };

  const onLogin = async (data) => {
    setError('');
    setLoading(true);  // Set loading to true when authentication starts
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Fetch the user document from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setLoading(false);  // Set loading to false when authentication succeeds
        if (userData.isUser) {
          navigate("/search", { replace: true });
        } else {
          navigate("/showSellerBookings", { replace: true });
        }
      } else {
        setLoading(false);  // Set loading to false if user document does not exist
        console.log("No such document!");
        setError("No account exists for this email.");
      }
    } catch (error) {
      setLoading(false);  // Set loading to false when authentication fails
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      if (errorCode === 'auth/wrong-password') {
        setError('The password entered is incorrect.');
      } else {
        setError(errorMessage);  // Ensure the error message is set correctly
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://firebasestorage.googleapis.com/v0/b/network-c70d4.appspot.com/o/login%2Floginpic1.jpg?alt=media&token=596be882-2300-4179-9dff-2426d227c71e")',
      }}
    >
      <Navbar currentPage="signin" />
      <div className="mt-16 px-4 md:px-8 min-h-90vh flex items-center justify-center">
        <div className="w-full max-w-md mt-20 bg-gray-100 p-5 pb-8 rounded-lg drop-shadow-lg mx-4 sm:mx-0">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onLogin)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <div className="text-xl font-bold font-jakarta-sans text-black-600 mb-2">Email</div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-bold font-jakarta-sans"
                  placeholder="Email"
                  {...register('email')}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <div className="text-xl font-bold font-jakarta-sans text-black-600 mb-2">Password</div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-bold font-jakarta-sans"
                  placeholder="Password"
                  {...register('password')}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}  // Disable the button when loading
              >
                {loading ? (
                  <ClipLoader size={20} color={"#ffffff"} />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
            {error && (
              <div className="error-message flex justify-center p-2 bg-red-100 border border-red-400 rounded">
                <p>{error}</p>
              </div>
            )}
            <div className="text-sm flex justify-center">
              <a
                href="#"
                onClick={reset}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>

            {message && (
              <div className="error-message flex justify-center p-2 bg-green-100 border border-green-400 rounded">
                <p>{message}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
