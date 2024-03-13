import { Checkbox, Col, Collapse, Flex, InputNumber, Row, Select, Slider } from "antd"
import { BaseOptionType } from "antd/es/select"
import { useEffect, useState } from "react"
import type { SliderSingleProps } from 'antd';

type params = {
    name:string,
    step?: number
    marks?: number[]
    min?:number,
    max?:number
}

export const RangedCollapse: React.FC<params> = ({name="",step=5, marks=[0,60,80,120,150],min=0,max=150}) =>{
    
    let [enable, setEnable]= useState(false)
    let [options, setOptions]= useState<BaseOptionType[]>([])

    const marksSet: SliderSingleProps['marks'] = marks.reduce((acc:any, curr) => {
        acc[curr.toString()] = curr.toString();
        return acc;
      },{})

    let items:any = [{
        key: '1',
        label: name,
        children: 
            <Flex justify="center">
                <Slider range={true} max={max} min={min} step={step} marks={marksSet} defaultValue={[min,max]}  style={{width:"80%"}}></Slider>
            </Flex>

    }]
    return (
        <Collapse 
            items={items}  
            defaultActiveKey={[]}  
            onChange={()=>setEnable(!enable)}
            style={enable?{backgroundColor: '#44bba4'}:{}}
        />
    )
}