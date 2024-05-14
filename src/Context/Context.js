import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../Firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const useFirestore = () => {
  const firestore = getFirestore(); // Get Firestore instance
  return firestore;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUser({ uid: user.uid, ...userDoc.data() });
        }
      } else {
        setUser(null);
      }
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
