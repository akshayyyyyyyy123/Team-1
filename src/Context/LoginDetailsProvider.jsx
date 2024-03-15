import React, { createContext, useState } from "react";

export const LoginDetailsContext = createContext(null);

const LoginDetailsProvider = ({ children }) => {

  const [employeeData, setEmployeeData] = useState(null);

  return (
    <LoginDetailsContext.Provider value={{ employeeData, setEmployeeData }}>
      {children}
    </LoginDetailsContext.Provider>
  );
};

export default LoginDetailsProvider;
