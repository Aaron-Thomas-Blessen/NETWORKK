import React, {  useState  } from 'react';
import { auth } from '../Firebase/Firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import {  signInWithEmailAndPassword , sendPasswordResetEmail,   } from 'firebase/auth'
import Navbar from '../components/nav';


const SignIn = () => {
  const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  const reset=(e) =>{
    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    setMessage("If your email is registered with us, you will receive a password reset email shortly.");
    console.log("Password reset email sent!")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setMessage(errorCode.substr(5, errorCode.length-1))
    console.log(errorCode, errorMessage)
    // ..
  });
}
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

           
            console.log("user"+user);
             navigate("/", { replace : true })

        })
        .catch((error) => {
            const errorCode = error.code;
            var errorMessage = error.message;
            
            console.log(errorCode, errorMessage)
            setError(errorCode);
        });
       
    }
    

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the sign in logic here
    console.log(email, password);
  };

  return (
    <div>
      <Navbar currentPage="signin"></Navbar>
    <div className="min-h-90vh flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign In
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onLogin}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
            <div className="text-xl font-bold font-jakarta-sans text-black-600 mb-2">
                Email
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm font-bold font-jakarta-sans"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
            <div className="text-xl font-bold font-jakarta-sans text-black-600 mb-2">
                Password
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm font-bold font-jakarta-sans"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
          {error && 
                <div className="error-message flex justify-center p-2 bg-red-100 border border-red-400 rounded">
                    <p>{error}</p>
                </div>
          }
          <div className="text-sm flex justify-center">
              <a href="#" onClick={reset} className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
            
            { message &&<div className="error-message flex justify-center p-2 bg-red-100 border border-red-400 rounded">
                    <p>{message}</p>
                </div> }
        </form>
      </div>
    </div>
    </div>
  );
};

export default SignIn;