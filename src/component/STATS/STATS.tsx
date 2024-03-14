import { Flex, Row, Slider } from "antd"
import type { SliderSingleProps } from 'antd';
import { RangedCollapse } from "../inputs/RangedCollapse/RangedCollapse";
import { useState } from "react";
export const STATS: React.FC = () => {
    let [data,setData] = useState({})
    let callFromChild = (key:string,type:string, value:any)=>{ 
        let tmp
        if (value){
          tmp = {...data, [key]: {type:type,value:value}}
        }else{
          tmp = {...data}
          delete tmp[key]
        }
        console.log(tmp)
        setData(tmp)
    }
    return(
        <>
            <RangedCollapse dbName="hp" label="hp" min={0} max={255} marks={[0,60,80,120,140,255]} callback={callFromChild}/>
            <RangedCollapse dbName="attack" label="attack" min={0} max={255} marks={[0,60,80,120,140,255]} callback={callFromChild}/>
            <RangedCollapse dbName="defense" label="defense" min={0} max={255} marks={[0,60,80,120,140,255]} callback={callFromChild}/>
            <RangedCollapse dbName="special-attack" label="special-attack" min={0} max={255} marks={[0,60,80,120,140,255]} callback={callFromChild}/>
            <RangedCollapse dbName="special-defense" label="special-defense" min={0} max={255} marks={[0,60,80,120,140,255]} callback={callFromChild}/>
            <RangedCollapse dbName="speed" label="speed" min={0} max={255} marks={[0,60,80,120,140,255]} callback={callFromChild}/>
        

        </>
    )
}