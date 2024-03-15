import React from "react";
import ChartPage from "./ChartPage";
import { useParams } from "react-router-dom";

const Chart = ({bgimage}) => {
    const { id } = useParams();
    return (

        <>
            
            <div style={{backgroundImage: `url(${bgimage})`}}>
                <ChartPage id = {id}/>
            </div>
        </>

        
    )
}

export default Chart;

