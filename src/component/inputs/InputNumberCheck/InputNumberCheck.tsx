import { Checkbox, Col, Collapse, Flex, Grid, InputNumber, Row, Select, Slider } from "antd"
import { BaseOptionType } from "antd/es/select"
import { useState } from "react"

type params = {
    label:string,
    key:string,
    max?:number,
    min?:number
    callback?:any,
    step?: number,
    defaultValue?:number[]
}
export const InputNumberCheck: React.FC<params> = ({label,key,max=255,min=0,callback,step=5,defaultValue}) => {
    
    let [minValue,setMinValue] = useState(defaultValue?defaultValue[defaultValue[0]]:min)
    let [maxValue,setMaxValue] = useState(defaultValue?defaultValue[defaultValue[1]]:max)
    let changeMin = (value:number|null)=>{
        callback(key,"value",[value,maxValue])
        setMinValue(Number(value))
    }
    let changeMax = (value:number|null)=>{
        callback(key,"value",[maxValue,value])
        setMaxValue(Number(value))
    }
    let collapseOnChange = (value:any)=>{
        if(JSON.stringify(value) == "[]"){
            setDisable(false)
            callback(key,false)
        }else{
            setDisable(true)
            callback(key,"value",[minValue,maxValue])
        }
    }
    let [disable, setDisable]= useState(false)
    let items:any = [{
        key: '1',
        label: label,
        children: 
          <>    
          <Row>
            min
              <InputNumber onChange={(value)=>{changeMin(value)}} min={min} max={max} step={step} disabled={!disable} value={minValue}/>
              -
              <InputNumber onChange={(value)=>{changeMax(value)}}  min={min} max={max} step={step} disabled={!disable} value={maxValue}/>
              max
          </Row>

          </>
    }]
    return (
        <Collapse 
            items={items}  
            defaultActiveKey={[]}  
            onChange={collapseOnChange}
            style={disable?{backgroundColor: '#44bba4'}:{}}
            />
    )
}