import { useSelector } from "react-redux";

// export function useAuth() {
//     return useContext(AuthContext)
// }

export function useAuth() {
    const {email, token, id, authorities, isAuth} = useSelector(state => state.user);

    return {
        isAuth,
        email,
        token,
        id,
        authorities,
    }
}