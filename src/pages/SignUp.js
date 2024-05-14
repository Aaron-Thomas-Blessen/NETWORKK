import React, { useState } from 'react';
import {  createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../components/nav';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Add username and email to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: name,
        email: email,
        isUser: role === "user",
      });

      console.log("User created and data stored in Firestore!");
      navigate('/', { replace: true } ); // Navigate to signin page after successful signup
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(error.message); // Set error message to display to the user
    }
  };

  return (
    <div>
        {/* <Navbar currentPage="signup"/> */}
    <div className="min-h-90vh mt-16 flex items-center justify-center">
       
      <div className="max-w-md w-1/3 bg-gray-100 p-5 pb-8 rounded-lg drop-shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <div className="text-xl font-bold font-jakarta-sans text-black-600 mb-2">
                User Name
              </div>
              <input
                id="name"
                name="name"
                type="name"
                
                required
                className="appearance-none relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm font-bold font-jakarta-sans"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                className="appearance-none  relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm font-bold font-jakarta-sans"
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
                className="appearance-none  relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm font-bold font-jakarta-sans"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <label
                className="text-xl font-bold font-jakarta-sans text-black-600 "
              >
              <div className="text-xl font-bold font-jakarta-sans text-black-600 mb-2">
                Sign up as:
              </div>
                <div>
                  <select value={role} onChange={(e) => setRole(e.target.value)} className='block w-full px-2 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:border-indigo-600'>
                    <option value="user">User</option>
                    <option value="serviceProvider">Service Provider</option>
                  </select>
                </div>
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
          {error && 
                <div className="error-message flex justify-center">
                    <p>{error}</p>
                </div>
          }
        </form>
      </div>
    </div>
    </div>
  );
};

export default SignUp;