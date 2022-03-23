import { Container } from "@mui/material";
import { useAuth } from "../hook/useAuth"
import { Typography } from "@mui/material";

export default function ProfilePage() {

    const { email, authorities } = useAuth();

    return (

        <Container>
            <Typography>Email: {email}</Typography>
            <Typography>Authorities: {authorities.map((authority, idx) => {
                return <li key={idx}>{authority}</li>;
            })}</Typography>
        </Container>

    )
}