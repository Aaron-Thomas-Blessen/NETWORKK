import React, { useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import Navbarsign from '../../components/navsign';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const db = getFirestore();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const q = query(collection(db, 'admins'), where('email', '==', email), where('password', '==', password));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setIsLoggedIn(true);
                localStorage.setItem('isAdmin', 'true'); // Store admin login state
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('Error logging in. Please try again.');
        }
    };

    if (isLoggedIn) {
        return <Navbarsign />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
                            required
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-center mb-4">{error}</div>
                    )}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
