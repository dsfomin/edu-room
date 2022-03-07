import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

export default function RequireAdminAuth({children}) {
    const location = useLocation();
    const {isAuth, authorities} = useAuth();

    return (isAuth && authorities.includes("ADMIN")) 
    ? children : <Navigate to={'/login'} state={{from: location}}/>;
}