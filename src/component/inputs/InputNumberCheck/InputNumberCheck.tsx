import { Checkbox, Col, Collapse, Flex, Grid, InputNumber, Row, Select, Slider } from "antd"
import { BaseOptionType } from "antd/es/select"
import { useState } from "react"

type params = {
    name:string,
    max?:number,
    min?:number
    defaultValue?:number[]
    callback?:any
}
export const InputNumberCheck: React.FC<params> = ({name="asd",max=255,min=0,defaultValue,callback}) => {
    
    let [minValue,setMinValue] = useState(defaultValue?defaultValue[defaultValue[0]]:min)
    let [maxValue,setMaxValue] = useState(defaultValue?defaultValue[defaultValue[1]]:max)
    let changeMin = (value:number|null)=>{
        callback(name,"value",[value,maxValue])
        setMinValue(Number(value))
    }
    let changeMax = (value:number|null)=>{
        callback(name,"value",[maxValue,value])
        setMaxValue(Number(value))
    }
    let collapseOnChange = (value:any)=>{
        if(JSON.stringify(value) == "[]"){
            setDisable(false)
            callback(name,false)
        }else{
            setDisable(true)
            callback(name,"value",[minValue,maxValue])
        }
    }
    let [disable, setDisable]= useState(false)
    let items:any = [{
        key: '1',
        label: name,
        children: 
          <>    
          <Row>
            min
              <InputNumber onChange={(value)=>{changeMin(value)}} min={min} max={max} step={5} disabled={!disable} value={minValue}/>
              -
              <InputNumber onChange={(value)=>{changeMax(value)}}  min={min} max={max} step={5} disabled={!disable} value={maxValue}/>
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