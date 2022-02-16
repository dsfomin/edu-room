import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

export default function RequireAuth({children}) {
    const location = useLocation();
    const {user} = useAuth();

    if (user.email === null || user.password === null) {
        return <Navigate to={'/login'} state={{from: location}} />
    }

    return children;
}