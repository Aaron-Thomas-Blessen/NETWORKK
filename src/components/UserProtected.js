import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";

export const UserProtected = ({ children }) => {
    const navigate = useNavigate();
    const [isUser, setIsUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists() && userDoc.data().isUser === true) {
                    setIsUser(true);
                } else {
                    setIsUser(false);
                    navigate("/");
                }
            } else {
                setIsUser(false);
                navigate("/");
            }
        };

        checkUser();
    }, [navigate]);

    if (isUser === null) {
        return <div>Loading...</div>;
    }

    return children;
};
