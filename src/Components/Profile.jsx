

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../Employee.css';
import '../Profile.css';
import Model from "react-modal";
import UpdateForm from "./UpdateForm";


const Profile = ({passImage}) => 
{
    const { id } = useParams();
    const [employeeData, setEmployeeData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [visible, setVisible] = useState(false);
    const [showBatchImage,setShowBatchImage] = useState(false);
    
    useEffect(() => {
        const getSearchedNameData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/employee/${id}`);
                setEmployeeData(response.data);
            } catch (error) {
                console.log("Error fetching data :-(", error);
            }
        };
        getSearchedNameData();
    }, []);
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }
    if (!employeeData) {
        return <h1>No Employee Profile</h1>
    }
    const downloadResume = () => {
        const resumeUrl = employeeData.offer_letter_url;
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.target = '_blank';
        link.download = 'resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const updateBro = async (updatedData) => {
        try {
            await axios.put(`http://localhost:8080/updateEmployee/${employeeData.emp_id}`, updatedData);
            alert("Employee Information Updated!!");
            setVisible(false);
        } catch (error) {
            console.log("Error updating employee information:", error);
        }
    };
    const redirectToSlackProfile = () => {
        if (employeeData && employeeData.slack) {
            window.location.href = employeeData.slack;
        } else {
            console.error("Slack profile URL not available in employeeData");
        }
    };

    const handleCellNoClick = () => {
        if (employeeData && employeeData.cell_no) {
            window.location.href = `facetime://${employeeData.cell_no}`;
        } else {
            console.error("Cell number not available in employeeData");
        }
    }

    const handleEmailClick = () => {
        if (employeeData && employeeData.email) {
            window.location.href = `mailto:${employeeData.email}`;
        } else {
            console.error("Email address not available in employeeData");
        }
    };
    
    const toggleImage = () => {
        setShowBatchImage(prevState => !prevState);
    };

    return (
        <div className="container" style={{ backgroundImage: `url(${passImage})`,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        }}>
            <div className="employee-card" style={{ backgroundColor: "#F0FFF0", padding: "20px", borderRadius: "10px", textAlign: "center", width:"480px" }}>
                <img
                    src={showBatchImage ? employeeData.image_url : employeeData.batch_image_url}
                    alt=""
                    width="150px"
                    height="150px"
                    style={{ borderRadius: "50%", marginBottom: "10px" ,marginTop: "20px"}}
                    className="employee-image"
                    onClick={toggleImage}
                />
                <h2 style={{ marginBottom: "0", marginLeft:"200px" }}>
                    {employeeData.emp_name}
                    <span className={`toggle-icon ${showDetails ? 'rotate' : ''}`} style={{ marginLeft: "150px", fontSize: "20px", cursor: "pointer" }} onClick={toggleDetails}>+</span>
                </h2>
                {showDetails && (
                    <div className="employee-details" style={{ marginTop: "20px",backgroundColor: "#fff", padding: "20px", borderRadius: "10px", textAlign: "left", width: "400px" }}>
                        <h3 style={{ marginBottom:"10px"}}>Employee ID: <span style={{fontWeight:"normal"}}>{employeeData.emp_id}</span></h3>
                        <h3 style={{ marginBottom:"10px"}}>Designation: <span style={{fontWeight:"normal"}}> {employeeData.designation} developer </span></h3>
                        <h3 style={{ marginBottom:"10px"}}>Level: <span style={{fontWeight:"normal"}}>{employeeData.level}</span></h3>
                        <h3 style={{ marginBottom:"10px"}}>Email-id: <span style={{ cursor: "pointer", fontWeight:"normal"}} onClick={handleEmailClick}>{employeeData.email}</span></h3>
                        <h3 style={{ marginBottom:"10px"}}>Cell_no: <span style={{ cursor: "pointer",fontWeight:"normal" }} onClick={handleCellNoClick}>{employeeData.cell_no}</span></h3>
                        <h3 style={{ marginBottom:"10px"}}>Reporting Manager: <span style={{fontWeight:"normal"}}>{employeeData.manager}</span></h3>
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
                            <button style={{ backgroundColor: "#C5EBAA", padding: "10px 20px", borderRadius: "5px" }} onClick={downloadResume}>Offer Letter</button>
                            <button style={{ backgroundColor: "#C5EBAA", padding: "10px 20px", borderRadius: "5px" }} onClick={() => setVisible(true)}> Update </button>
                            <button style={{ backgroundColor: "#C5EBAA", padding: "10px 20px", borderRadius: "5px" }} onClick={redirectToSlackProfile}>Slack Profile</button>
                        </div>
                        <Model isOpen={visible} style={{
                            overlay: {
                                background: "rgba(255, 255, 255, 0.8)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "0%",
                                height: "150px",
                                marginTop:"140px",
                                marginLeft:"150px",
                                marginRight:"0px",
                                marginBottom:"100px"
                            },
                            content: {
                                width: "440px",
                                height: "642px",
                                backgroundColor: "white",
                                borderRadius: "10px",
                                marginLeft:"464px",
                                marginTop:"0px"
                            }
                        }}
                            appElement={document.getElementById('root')}>
                            <UpdateForm onUpdate={updateBro} /> 
                            <button 
  onClick={() => setVisible(false)} 
  className="close-btn" 
  style={{ width: "110px", padding: "8px", marginLeft: "166px", border: "0px", borderRadius: "4px", backgroundColor: "#FF8080", color: "white", transition: "background-color 0.3s" }}
>
  Close
</button>

                        </Model>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Profile;