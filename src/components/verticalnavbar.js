import React, { useState } from 'react';
import { FaHome, FaUserAlt, FaCog, FaSearch, FaCalendarAlt, FaTimes, FaBars } from 'react-icons/fa';

const VerticalNavbar = () => {
    const [active, setActive] = useState(false);

    return (
        <div className="h-screen sticky top-0 flex-shrink-0">
            <div className={`menu ${active ? 'w-56' : 'w-16'} h-full bg-white  rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out`}>
                <div className="toggle h-10 w-10 bg-black rounded-half absolute top-[-5] right-[-5] flex items-center justify-center cursor-pointer" onClick={() => setActive(!active)}>
                    {active ? <FaTimes className="h-14 w-6 text-white" /> : <FaBars className="h-14 w-6 text-white" />}
                </div>
                <ul className="space-y-2 p-2">
                    <li className="flex items-center space-x-4 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
                        <FaSearch className="h-14 w-6 text-gray-600" />
                        <span className={`transition-all duration-500 ease-in-out ${active ? 'opacity-100' : 'opacity-0'}`}>Search</span>
                    </li>
                    <li className="flex items-center space-x-4 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
                        <FaHome className="h-14 w-6 text-gray-600" />
                        <span className={`transition-all duration-500 ease-in-out ${active ? 'opacity-100' : 'opacity-0'}`}>Home</span>
                    </li>
                    <li className="flex items-center space-x-4 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
                        <FaUserAlt className="h-14 w-6 text-gray-600" />
                        <span className={`transition-all duration-500 ease-in-out ${active ? 'opacity-100' : 'opacity-0'}`}>Profile Dashboard</span>
                    </li>
                    <li className="flex items-center space-x-4 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
                        <FaCalendarAlt className="h-14 w-6 text-gray-600" />
                        <span className={`transition-all duration-500 ease-in-out ${active ? 'opacity-100' : 'opacity-0'}`}>Calendar</span>
                    </li>
                    <li className="flex items-center space-x-4 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
                        <FaCog className="h-14 w-6 text-gray-600" />
                        <span className={`transition-all duration-500 ease-in-out ${active ? 'opacity-100' : 'opacity-0'}`}>Settings</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default VerticalNavbar;
