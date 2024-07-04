import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";

export const ServiceProviderProtected = ({ children }) => {
    const navigate = useNavigate();
    const [isServiceProvider, setIsServiceProvider] = useState(null);

    useEffect(() => {
        const checkServiceProvider = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists() && userDoc.data().isUser === false) {
                    setIsServiceProvider(true);
                } else {
                    setIsServiceProvider(false);
                    navigate("/");
                }
            } else {
                setIsServiceProvider(false);
                navigate("/");
            }
        };

        checkServiceProvider();
    }, [navigate]);

    if (isServiceProvider === null) {
        return <div>Loading...</div>;
    }

    return children;
};
