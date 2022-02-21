import { Link, useLocation, useNavigate } from "react-router-dom";
import { Paper, TextField, Typography, Button, Box } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {signin} from "../store/slices/userSlice"
import { authenticateUser } from "../client";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const fromPage = location.state?.from?.pathname || '/'

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        
        authenticateUser(user).then((response)=> {
            if (response.status===200) {
                console.log("Authenticated!")
            } else {
                console.log('Something Wrong! Please Try Again ', response.status); 
            }
            return response.json();
        })
        .then(data => {
            console.log(data.token);
            dispatch(signin({
                email: data.email,
                token: data.token,
                id: data.id
            }));
            navigate(fromPage, {replace: true})
        })
        .catch((err)=>{
            console.log("Credencials are wrong ,", user, err);
        });
        
    };

    return (
        <>
            <Paper>
                <h2>Login</h2>
                <TextField
                    defaultValue={user.email}
                    onChange={e => setUser({ ...user, email: e.target.value })}
                    label={"Email"}
                />
                <TextField
                    defaultValue={user.password}
                    label={"Password"}
                    onChange={e => setUser({ ...user, password: e.target.value })}
                />
                <Typography />
                <Button onClick={handleSubmit}>Sign In</Button>
                <Box>
                    <Typography>Don't have account?</Typography>
                    <Link to={"/register"}>Sign Up</Link>
                </Box>
            </Paper>
        </>
    )
}