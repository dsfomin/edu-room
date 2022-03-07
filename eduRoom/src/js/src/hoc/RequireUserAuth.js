import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

export default function RequireUserAuth({children}) {
    const location = useLocation();
    const {isAuth, authorities} = useAuth();

    return (isAuth && authorities.includes("USER")) 
    ? children : <Navigate to={'/login'} state={{from: location}}/>;
}
