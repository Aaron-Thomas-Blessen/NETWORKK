import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/nav';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ClipLoader from "react-spinners/ClipLoader";

// Validation schema using Yup
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z][A-Za-z0-9_]{2,29}$/, 'Username must start with an alphabet and be 3-30 characters long')
    .required('Username is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
  role: yup.string().required('Role is required'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  // Added loading state
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);  // Set loading to true when sign-up starts
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        username: data.name,
        email: data.email,
        isUser: data.role === 'user',
      });

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      setLoading(false);  // Set loading to false when sign-up succeeds
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.isUser) {
          console.log('User created and data stored in Firestore!');
          navigate('/UserProfilePage', { replace: true });
        } else {
          navigate('/SellerProfilePage', { replace: true });
        }
      }
    } catch (error) {
      setLoading(false);  // Set loading to false when sign-up fails
      console.error('Error signing up:', error.message);
      setError(error.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://firebasestorage.googleapis.com/v0/b/network-c70d4.appspot.com/o/login%2Floginpic2.jpg?alt=media&token=d21b673e-cb2f-4a4a-9a90-7dfbc7a13925")',
      }}
    >
      <Navbar currentPage="signup" />
      <div className="mt-16 px-4 md:px-8 min-h-90vh flex items-center justify-center p-4">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mt-16 bg-gray-100 p-5 pb-8 rounded-lg drop-shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <div className="text-xl font-bold font-jakarta-sans text-black-600 mb-2">User Name</div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="appearance-none relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-bold font-jakarta-sans"
                  placeholder="User name"
                  {...register('name')}
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
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

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <label className="text-xl font-bold font-jakarta-sans text-black-600">
                  <div className="text-xl font-bold font-jakarta-sans text-black-600 mb-2">Sign up as:</div>
                  <div>
                    <select
                      {...register('role')}
                      className="block w-full px-2 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:border-indigo-600"
                    >
                      <option value="user">User</option>
                      <option value="serviceProvider">Service Provider</option>
                    </select>
                    {errors.role && <p className="text-red-500">{errors.role.message}</p>}
                  </div>
                </label>
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
                  "Sign Up"
                )}
              </button>
            </div>
            {error && (
              <div className="error-message flex justify-center p-2 bg-red-100 border border-red-400 rounded">
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
