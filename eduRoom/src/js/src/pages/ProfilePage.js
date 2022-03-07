import { Container } from "@mui/material";
import { useAuth } from "../hook/useAuth"


export default function ProfilePage() {

    const { email, authorities } = useAuth();

    return (

        <Container>
            <div>Email: {email}</div>
            <div>Authorities: {authorities}</div>
        </Container>

    )
}