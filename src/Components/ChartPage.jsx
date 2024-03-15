import { useEffect, useState } from 'react';
import axios from 'axios';
import FinalChart from './FinalChart';

let photo = "https://img.freepik.com/free-photo/confident-cheerful-young-businesswoman_1262-20881.jpg";
function ChartPage(props) 
{
     const dummy_data = {
      id : props.id,
      atrributes : {
        name: "Company",
        department : "SDE",
        level : "L1",
        image : photo,
      },
      children: [],
    };
     const [data,setData] = useState(dummy_data);
     useEffect(() => {
        const fetching_employee_data = async () => {
          try {
            const url = "http://localhost:8080/employee/"
            const url_employee= url + props.id;
            const response_employee = await axios.get(url_employee);
            const data_employee= [response_employee.data]
            console.log("Employee Data",data_employee)
            console.log("Employee data length",data_employee.length)
            for (let i = 0; i < data_employee.length; i++) {
              const element = data_employee[i];
              if (element === null) continue;
              //---------------------------
              dummy_data.id = props.id;
              dummy_data.atrributes.name = element.emp_name
              dummy_data.atrributes.department = element.department.d_name;
              dummy_data.atrributes.level = "Level " + element.level
              dummy_data.atrributes.image = element.image_url
              setData(dummy_data);
              console.log("fia:",data)
              return;
            }
          } catch (error) {
            console.error('Error fetching or updating data:', error);
          }
        };
        fetching_employee_data();
      }, []);
      

  return (
    
        <div>
          <FinalChart data = {data}/>
        </div>
   
  );
  }
export default ChartPage;  

