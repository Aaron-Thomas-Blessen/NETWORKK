import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../Firebase/Firebase";

export const AdminProtected=({children})=>{

    const nav = useNavigate();
    const [isLogged,setLogged] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user.uid === "qHwgfHx6fEgFxaSVnr21R3JeYDF2") {
            console.log(user);
            setLogged(true);
          } else {
            setLogged(false);
          }
        });
        return () => unsubscribe();
      }, []);
      
    switch(isLogged){
        case true:
            return children
        case false:
             nav("/");
        case null:
            return
                
    }

}