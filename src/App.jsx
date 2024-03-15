import React from "react";
import Login from "./Components/Login";
import Chart from "./Components/Chart";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from "./Components/SearchBar";
import LoginDetailsProvider from "./Context/LoginDetailsProvider";
import Options from "./Components/Options";
import Profile from "./Components/Profile";
import SearchProfile from "./Components/SearchProfile";
import EmployeeList from "./Components/EmployeeList";
import loginImage from "./images/img1.png";
import gif1 from "./images/gif1.mp4";
import search1 from "./images/search1.gif";
import bg from "./images/bg.jpg";
import emp1 from "./images/emp1.jpg";
import bgimage from "./images/bgimage.jpeg";
import companyLogo from "./images/money_view_logo.jpeg";

const App = () => {
  return (
      <>
          <Routes>
            <Route path="/" element={<Login passImage={loginImage} bgimage={bgimage} comLogo={companyLogo}/>} />
            <Route path="/details" element={<Options passImage={gif1} searchImage={search1} employeeImage={emp1} bgimage={bgimage}/>}/>
            <Route path="/search" element={<SearchBar passImage={bg}/>}/>
            <Route path="/organization-chart/:id" element={<Chart bgimage={bgimage} />}/>
            <Route path="/profile/:id" element={<Profile passImage={bgimage}/>} />
            <Route path="/searchProfile/:id" element={<SearchProfile bgimage={bgimage}/>} />
            <Route path="/employeeList" element={<EmployeeList bgimage={bgimage}/>}></Route>
          </Routes>
      </>
  );
}

export default App;


