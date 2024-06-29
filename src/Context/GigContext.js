// GigContext.js
import { createContext, useContext, useState } from 'react';

const GigContext = createContext();

export const useGig = () => useContext(GigContext);

export const GigProvider = ({ children }) => {
  const [selectedGig, setSelectedGig] = useState(null);

  const selectGig = (gig) => {
    setSelectedGig(gig);
  };

  return (
    <GigContext.Provider value={{ selectedGig, selectGig }}>
      {children}
    </GigContext.Provider>
  );
};
