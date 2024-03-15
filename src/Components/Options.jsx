import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { LoginDetailsContext } from "../Context/LoginDetailsProvider";
import './Options.css';
import { AppBar, Toolbar, Card, CardContent, Typography, MenuItem, Menu, IconButton, Avatar } from "@mui/material";


const Options = ({ bgimage, passImage, searchImage, employeeImage }) => {
    const { employeeData } = useContext(LoginDetailsContext);
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#AAD9BB' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MoneyView
                    </Typography>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <Avatar alt={employeeData.emp_name} src={employeeData.image_url} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            
            <div className="options-container" style={{
                backgroundImage: `url(${bgimage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                backgroundrepeat: 'no-repeat',
            }}>

                <div className="top-left option-container">
                    <div className="profile-card">
                        <Card style={{ backgroundColor: "#E1F0DA", width: "400px", height: "300px", textAlign: "center" }}>
                            <CardContent>
                                <div style={{ marginBottom: "10px" }}>
                                    <img src={employeeData.image_url} alt={employeeData.emp_name} width="120px" height="140px" style={{ borderRadius: '50%', display: 'block', margin: '0 auto' }} />
                                </div>
                                <Typography variant="h5" component="h2" align="center" gutterBottom>
                                    Hello {employeeData.emp_name}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {employeeData.designation} developer
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    {/* <Link to={`/profile/${employeeData.emp_id}`}> <button>My Details</button> </Link> */}
                    <div className="profile-button">
                        <Link to={`/profile/${employeeData.emp_id}`}>
                            <button >My Details</button>
                        </Link>
                    </div>
                </div>
                <div className="top-right option-container">
                    {/* <Link to="/search">Search</Link> */}
                    <div className="search-container">
                        <img src={searchImage} alt="Search GIF" />
                        <Link to="/search">
                            <button>Search</button>
                        </Link>
                    </div>
                </div>
                <div className="bottom-right option-container">
                    {/* <Link to="/organization-chart">Organization Chart</Link> */}
                    <div className="org-chart-container" >
                        {/* <img src={prop.passImage} alt="Organization Chart GIF" /> */}
                        <video autoPlay loop muted>
                            <source src={passImage} type="video/mp4" /> {/* Correct MIME type */}
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="button-container">
                        <li> <Link to={`/organization-chart/${employeeData.emp_id}`}>  <button>View Organization Chart</button> </Link> </li>
                    </div>
                </div>
                <div className="bottom-left option-container">
                    <div className="employee-container">
                        <img src={employeeImage} alt="Employee Image" />
                    </div>
                    <div className="emp-button-container">
                        <Link to="/employeeList">
                            <button >List of Employees</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Options;