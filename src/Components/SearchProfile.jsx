import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../Employee.css';
import '../Profile.css';
const SearchProfile = ({bgimage}) => {
    const { id } = useParams();
    const[employeeData, setEmployeeData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
   
    useEffect(() => {
        const getSearchedNameData = async() => {
            try {
                const response = await axios.get(`http://localhost:8080/employee/${id}`);
                setEmployeeData(response.data);
                // setShowDetails(true);
            }
            catch(error) {
                console.log("Error fetching data :-(",error);
            }
        }
        getSearchedNameData();
    }, []);
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }
    if(!employeeData) {
        return <h1>No Employee Profile</h1>
    }
    return (
        <>
           
<div className="search-profile-container" style={{ backgroundImage: `url(${bgimage})`, minHeight: '100vh',backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', }}>
<div style={{ width: "fit-content", margin: "0 auto", marginTop: "100px" }}>
            <div style={{ backgroundColor: "#F0FFF0", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                <img
                    src={employeeData.image_url}
                    alt=""
                    width="150px"
                    height="150px"
                    style={{ borderRadius: "50%", marginBottom: "10px", marginTop: "20px" }}
                />
                <h2>
                    {employeeData.emp_name}
                    <span
                        className={`toggle-icon ${showDetails ? 'rotate' : ''}`}
                        style={{ marginLeft: "100px", fontSize: "20px", cursor: "pointer" }}
                        onClick={toggleDetails}
                    >+</span>
                </h2>
                {showDetails && (
                    <div style={{ marginTop: "20px", backgroundColor: "#fff", padding: "20px", borderRadius: "10px", textAlign: "left", width: "400px" }}>
                        <h3 style={{ marginBottom:"10px"}}>Employee ID: <span style={{fontWeight:"normal"}}>{employeeData.emp_id}</span></h3>
                        <h3 style={{ marginBottom:"10px"}}> Designation:<span style={{fontWeight:"normal"}}> {employeeData.designation} developer </span></h3>
                        <h3 style={{ marginBottom:"10px"}}>Level:<span style={{fontWeight:"normal"}}>{employeeData.level}</span></h3>
                        <h3 style={{ marginBottom:"10px"}}>Email-id: <span style={{ cursor: "pointer", fontWeight:"normal"}} >{employeeData.email}</span></h3>
                        <h3 style={{ marginBottom:"10px"}}>Cell_no: <span style={{ cursor: "pointer",fontWeight:"normal" }} >{employeeData.cell_no}</span></h3>
                        <h3>Reporting Manager: <span style={{fontWeight:"normal"}}>{employeeData.manager}</span></h3>
                    </div>
                )}
            </div>
        </div>
        </div>
        </>
    )
}
export default SearchProfile;