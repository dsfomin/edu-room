import { Link } from "react-router-dom";

export default function HomePage() {
    
    return (
        <>
            <h1>Hello!</h1>
            <Link to={'/users'}>Users</Link>
        </>
    )
}