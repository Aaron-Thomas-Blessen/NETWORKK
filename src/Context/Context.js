import React, { createContext, useState } from 'react';
export const IsSignedUpContext = createContext();


export const IsSignedUpProvider = ({ children }) => {

  const [isSignedUp, setIsSignedUp] = useState(false); 
  return (
    <IsSignedUpContext.Provider value={{ isSignedUp, setIsSignedUp }}>
      {children}
    </IsSignedUpContext.Provider>
  );
};