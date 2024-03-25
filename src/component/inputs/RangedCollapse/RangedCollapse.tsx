import { Collapse, Flex, Slider } from "antd"
import { BaseOptionType } from "antd/es/select"
import { useState } from "react"
import type { SliderSingleProps } from 'antd';

type params = {
    dbName:string,
    label:string,
    step?: number
    marks?: number[]
    min?:number,
    max?:number,
    callback?:any,
    intermidateFunction?:any
}

export const RangedCollapse: React.FC<params> = ({ dbName,label,step=5, marks=[],min=0,max=150,callback,intermidateFunction=undefined}) =>{
    
    let [enable, setEnable]= useState(false)
    let [rangeValue, setRangeValue] = useState([min,max])
    let SliderChange=(value:any)=>{
        let tmp = intermidateFunction?intermidateFunction(value):value
        callback(dbName,"value",tmp)
        setRangeValue(value)
    }
    let collapseOnChange = (value:any)=>{
        if(JSON.stringify(value) == "[]"){
            setEnable(false)
            callback(dbName,false)
        }else{
            setEnable(true)
            callback(dbName,"value",rangeValue)
        }
    }
    const marksSet: SliderSingleProps['marks'] = marks.reduce((acc:any, curr) => {
        acc[curr.toString()] = curr.toString();
        return acc;
      },{})

    let items:any = [{
        key: '1',
        label: label,
        children: 
            <Flex justify="center">
                <Slider onChange={SliderChange}range={true} max={max} min={min} step={step} marks={marksSet} defaultValue={[min,max]}  style={{width:"80%"}}></Slider>
            </Flex>

    }]
    return (
        <Collapse 
            items={items}  
            defaultActiveKey={[]}  
            onChange={collapseOnChange}
            style={enable?{backgroundColor: '#44bba4'}:{}}
        />
    )
}