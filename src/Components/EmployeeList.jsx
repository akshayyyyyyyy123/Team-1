import React, { useEffect, useState } from "react";
import axios from "axios";
import "../EmployeList.css";


const EmployeeList = (prop) => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const getAllEmployeeData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/allEmployees/list");
        setEmployeeData(response.data);
      } catch (error) {
        console.log("Error fetching data :-(", error);
      }
    };
    getAllEmployeeData();
  }, []);

  return (
          <div>
            {/* EMPLOYEE SECTION */}
            <p style={{textAlign:"center",  fontSize:"25px", color:"darkgreen", fontSize:"50px"}}> Employees </p>
            <div className="employee-list-container">
        <div className="employee-cards">
          {employeeData.map((employee) => (
            <div key={employee.emp_id} className="employee-card">
              <img src={employee.image_url} alt=""  width="120px" height="120px" style={{borderRadius:"50%", marginLeft:"68px", marginTop:"10px", padding:"4px",boxShadow: "0 0 0 2px #B7E5B4, 0 0 0 4px #B7E5B4"}}/>
              <p style={{textAlign:"center", padding:"10px", fontSize:"25px"}}> {employee.emp_name}</p>
              <p style={{fontSize:"20px", textAlign:"center", color:"darkgreen"}}> {employee.designation} Developer </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
