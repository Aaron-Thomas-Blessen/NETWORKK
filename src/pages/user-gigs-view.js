

// function UserGigView() {
//     return (
//         <>
//             <header>
//                 <div className="flex justify-between items-center bg-gray-200 p-4">
//                     <div className="logo">
//                         <img src="path_to_your_logo" alt="Logo" className="h-10" />
//                     </div>
//                     <div className="relative w-500">
//                         <input type="text" placeholder="What you looking for..." className="p-2 h-10 w-full pl-10 rounded border border-gray-300" />
//                         <SlMagnifier className="h-6 w-6 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
//                     </div>
//                 </div>
//             </header>
//         </>
//     )
// }

// export default UserGigView;


import React from 'react';
import { SlMagnifier } from "react-icons/sl";



const UserGigView = () => {
  return (
    <div className="flex justify-between items-center bg-gray-200 p-4">
      <div className="flex items-center">
        <img src="path_to_your_logo" alt="Logo" className="h-10 mr-2" />

      </div>
      <div className="relative w-100">
      <input type="text" placeholder="What ypu are looking for..." className="p-2 pl-10 rounded border border-gray-300 w-full" />
      <SlMagnifier className="h-6 w-6 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
    </div>
    </div>
  );
};

export default UserGigView;
