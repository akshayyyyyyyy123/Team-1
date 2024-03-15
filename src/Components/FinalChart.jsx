// all the imports here
import { useState, useCallback , useEffect} from "react";
import Tree from "react-d3-tree";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const FinalChart = (props) => {
// our tree data
const [data,setData] = useState(props.data);
const [excelDownload, setExcelDownload] = useState([]);


const navigate = useNavigate();
// initial data fetching i.e., parent of current employee  <-> current employee <-> children of current employee
useEffect(() => {
  const fetching_initial_data = async () => {
    try {
      const url_temp_child = "http://localhost:8080/employee/children/";
      const url_child = url_temp_child + props.data.id;
      const response_child = await axios.get(url_child);
      const data_child= response_child.data
    const children = [];
      for (let i = 0; i < data_child.length; i++) {
        const element = data_child[i];
        if (element === null) continue;
        //---------------------------
        const child = {
          id : element.emp_id,
          atrributes : {
            name: element.emp_name,
            department : element.department.d_name,
            level : "Level " + element.level,
            image : element.image_url,
          },
          children: [],
        };
        children.push(child);
      }
      //---------------------------
      const temp_data = {
        id : data.id,
        atrributes : {
          name: data.atrributes.name,
          department : data.atrributes.department,
          level : data.atrributes.level,
          image : data.atrributes.image,
        },
        children: children,
      };
      //---------------------------
      const new_data = [{
        id : data.id,
        atrributes : {
          name: data.atrributes.name,
          department : data.atrributes.department,
          level : data.atrributes.level,
          image : data.atrributes.image,
        },
        children: children,
      }
      ]
     const url_temp_parent = "http://localhost:8080/employee/parent/";
      const url_parent = url_temp_parent + props.data.id;
      const response_parent = await axios.get(url_parent);
      const data_parent= response_parent.data
      for (let i = 0; i < data_parent.length; i++) {
        const element = data_parent[i];
        if (element === null) continue;
        //---------------------------
        const parent = {
          id : element.emp_id,
          atrributes : {
            name: element.emp_name,
            department : "",
            level : "Level " + element.level,
            image : element.image_url,
          },
          children: new_data,
        };
    //---------------------------
      setData(parent);
      return;
      }
      if(data_parent.length===0){
        setData(temp_data)
      }
    } catch (error) {
      console.error('Error fetching or updating data:', error);
    }
  };
  fetching_initial_data();
}, []);
// Navigating to another profile logic
const Navigation = async(nodeDatum) => {
  console.log(nodeDatum.id);
  navigate(`/Profile/${nodeDatum.id}`);
};



// Handling download
const handleDownload = async (nodeDatum) => {
    try {
        const currentEmployeeResponse = await axios.get(`http://localhost:8080/employee/${nodeDatum.id}`);
        console.log("NodeDatum:", nodeDatum);
        console.log("Current Employee Data:", currentEmployeeResponse.data);
        
        // Update state with downloaded data
        setExcelDownload(currentEmployeeResponse.data);
        const ddd = currentEmployeeResponse.data;
        console.log("Excel Download State:", excelDownload);
        console.log(excelDownload.length);
        console.log(ddd);
        if (ddd) {
            // const employeeInfo = ddd.map((employee) => ({
                const employeeInfo = [{
                    "Employee ID": ddd.emp_id,
                    "Name": ddd.emp_name,
                    "Designation": ddd.designation,
                    "Level": ddd.level,
                    "Email-id": ddd.email,
                    "Cell_no": ddd.cell_no,
                    "Department": ddd.department && ddd.department.d_name,
                    "Reporting Manager": ddd.manager && ddd.manager.m_name
                }];
                
                console.log("Employee Info for Excel:", employeeInfo);
                
                const ws = XLSX.utils.json_to_sheet(employeeInfo);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "EmployeeInfo");
                XLSX.writeFile(wb, "EmployeeInfo.xlsx");
            
        }
    } catch(error) {
        console.error("Error:", error);
    }
};


// What happens when user click on down button
const DownClick = async (nodeDatum) => {
  try {
    console.log(data);
    const f = "http://localhost:8080/employee/children/";
    const url = f+nodeDatum.id;
    const response = await axios.get(url)
    const reporteesList= response.data;
    const children = [];
      for (let i = 0; i < reporteesList.length; i++) {
        const element = reporteesList[i];
        if (element === null) continue;
        //---------------------------
        const childData = {
          id : element.emp_id,
          atrributes : {
            name: element.emp_name,
            department : "",
            level : "Level " + element.level,
            image : element.image_url,
          },
          children: [],
        };
        children.push(childData);
      }
      //---------------------------
      const newData = bfs_down(nodeDatum,data,children);
       setData(newData);
  } catch (error) {
    console.error('Error fetching or updating data:', error);
  }
};
// What happens when user click on up button
const UpClick = async (nodeDatum) => {
  console.log("ID " ,nodeDatum.id)
  try {
    const f = "http://localhost:8080/employee/parent/";
    const url = f+nodeDatum.id;
    const response = await axios.get(url)
    const reporteesList= response.data;
      if(data.id == nodeDatum.id)
      for (let i = 0; i < reporteesList.length; i++) {
        const element = reporteesList[i];
        if (element === null) continue;
        //---------------------------
        const parent = {
          id : element.emp_id,
          atrributes : {
            name: element.emp_name,
            department  : "",
            level : "Level " + element.level,
            image : element.image_url,
          },
          children: [],
        };
        bfs_up(nodeDatum,data,parent)
        setData(parent);
        return;
      }
  } catch (error) {
    console.error('Error fetching or updating data:', error);
  }
};
  // Card to show tree data
  const renderNodeWithCustomEvents = ({nodeDatum,DownClick,UpClick}) => (
    <g>
      <circle r="0"/>
      <defs>
  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stopColor="#45A049" />
    <stop offset="100%" stopColor="white" />
  </linearGradient>
</defs>
      <rect
      rx="10"
      ry="10"
        x="-140"
        y="-18"
        width="300"
        height="70"
        fill="url(#gradient)"
        stroke="black"
        strokeWidth="2"
        onClick={() => Navigation(nodeDatum)}
      />
       <circle cx="0" cy="58" r="5" fill="white" strokeWidth={1} onClick={() => DownClick(nodeDatum)} />
    <circle cx="0" cy="-25" r="5" fill="white" strokeWidth={1} onClick={() => UpClick(nodeDatum)} />
      <defs>
    <clipPath id="circle-mask">
      <circle cx="-50" cy="17" r="30"/>
    </clipPath>
      </defs>
     <image href={nodeDatum?.atrributes?.image}
            width="80"
            height="80"
            x="-90"
            y="-20"
            clip-path="url(#circle-mask)"
            />
      <text
        fill="black"
        strokeWidth="0.5"
        textAnchor="start"
        dominantBaseline="middle"
        x="0"
        y="14"
      >
      <tspan x="0" dy="-1em">{nodeDatum?.atrributes?.name}</tspan>
      <tspan x="0" dy="1.2em">{nodeDatum?.atrributes?.department}</tspan>
      <tspan x="0" dy="1.2em">{nodeDatum?.atrributes?.level}</tspan>
      </text>
      <g onClick={() => handleDownload(nodeDatum)}>
     <svg
      x="120"
      y="3"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="black"
      stroke="#45A049"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="rotate(45)"
    >
      <g transform="rotate(90 12 12)">
    <path d="M21 12H3M21 12L12 3M21 12L12 21" />
  </g>
    </svg>
  </g>
    </g>
  );
  // Tree code
  const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
    const [translate, setTranslate] = useState(defaultTranslate);
    const containerRef = useCallback((containerElem) => {
      if (containerElem !== null) {
        const { width, height } = containerElem.getBoundingClientRect();
        setTranslate({ x: width / 2, y: height / 2 });
      }
    }, []);
    return [translate, containerRef];
  };
  const [containerRef] = useCenteredTree();
  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={containerRef}>
      <Tree
        data={data}
        zoomable = {true}
        enableLegacyTransitions={true}
        orientation="vertical"
        pathFunc="step"
        separation={{ siblings: 3, nonSiblings: 3 }}
        translate={{ x: 900, y: 100 }}
        renderCustomNodeElement={(rd3tProps) =>
          renderNodeWithCustomEvents({ ...rd3tProps,DownClick,UpClick})
        }
      />
    </div>
  );
};
// BFS function to insert children at right node in the json
function bfs_down(node,tree,children){
  const queue = [];
  queue.unshift(tree);
  while(queue.length>0){
    const curNode = queue.pop();
    if(curNode.id===node.id){
      console.log("BFS Down",curNode);
      if(curNode.children.length===0){
      curNode.children = children;
      }
      else if(curNode.children.length==1){
        const child = curNode.children[0]
        const ans = [];
        ans.push(child);
        for(let i=0 ; i<children.length ; i++){
             const child_temp = children[i];
             if(child.id!=child_temp.id){
              ans.push(child_temp)
             }
        }
        console.log(ans);
        curNode.children = ans;
      }
      return { ...tree };
    }
    const len = curNode.children.length;
    for(let i=0 ; i<len ; i++){
      queue.unshift(curNode.children[i])
    }
  }
}
function bfs_up(node,tree,parent){
  const queue = [];
  queue.unshift(tree);
  while(queue.length>0){
    const curNode = queue.pop();
    if(curNode.id===node.id){
      parent.children = [curNode];
      return { ...tree };
    }
    const len = curNode.children.length;
    for(let i=0 ; i<len ; i++){
      queue.unshift(curNode.children[i])
    }
  }
}
export default FinalChart;