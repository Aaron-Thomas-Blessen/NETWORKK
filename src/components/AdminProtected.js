import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminProtected = ({ children }) => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const adminState = localStorage.getItem('isAdmin');
        if (adminState === 'true') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
            navigate("/");
        }
    }, [navigate]);

    if (isAdmin === null) {
        return <div>Loading...</div>; // Optionally, return a loading indicator
    }

    return children;
};
