
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { LoginDetailsContext } from '../Context/LoginDetailsProvider';

const Login = (prop) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setEmployeeData } = useContext(LoginDetailsContext);
    const [showText, setShowText] = useState(false);
    const handleTextAnimation = () => {
        setShowText(true);
    };
    useEffect(() => {
        const timeout = setTimeout(handleTextAnimation, 1000);
        return () => clearTimeout(timeout);
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', { email, password });
            console.log(response.data);
            setEmployeeData(response.data);
            navigate(`/details`);
        } catch (error) {
            console.error(error);
            setError('Invalid email or password');
        }
    };
    return (
        <div className="login-container" style={{backgroundImage: `url(${prop.bgimage})`}}>
            <div className="left-half">
                <Typography variant="h5" className={`welcome-text ${showText ? 'show' : ''}`} style={{fontSize:"2.5rem"}}>
                    <p className="textinside">Welcome to MoneyView</p>
                </Typography>
                <img src={prop.passImage} alt="Company Logo" className="logo-image" />
            </div>
            <div className="right-half">
                <Container maxWidth="xs">
                    <Paper elevation={4} style={{ padding: '16px', margin: '16px', backgroundColor: '#E7F2EA' }}>
                        <Typography variant="h4" align="center">Employee Portal</Typography>
                        <Typography variant="subtitle1" align="center" style={{ marginBottom: '20px' }}> </Typography>
                        <img src={prop.comLogo} alt="" width="100px" height="100px" style={{marginLeft:"120px"}}/>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && <Typography color="error">{error}</Typography>}
                            <Button type="submit" variant="contained" style={{ backgroundColor: '#4CAF50', color: 'white', marginTop: '20px' }} fullWidth>
                                Login
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </div>
        </div>
    );
};
export default Login;