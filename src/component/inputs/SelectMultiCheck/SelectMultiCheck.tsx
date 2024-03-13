import { Checkbox, Col, Collapse, Flex, InputNumber, Row, Select, Slider } from "antd"
import { BaseOptionType } from "antd/es/select"
import { useEffect, useState } from "react"

type params = {
    name:string,
    span?:number,
    urlSource?:string,
    selected?: string[],
    setSelected?: any
}

export const SelectMultiCheck: React.FC<params> = ({name,span=6, urlSource=`${process.env.API_URL}/effects`,selected,setSelected}) =>{
    
    let [enable, setEnable]= useState(false)
    let [options, setOptions]= useState<BaseOptionType[]>([])
    useEffect(()=>{
        fetch(urlSource,{
            method: 'GET',
            headers: {
                'Cors': 'no-cors',
                'Accept': 'application/json'
            }

        }).then((res)=>res.json()).then(
            (data)=>{
                let tmp_options = [...options]
                let tmp_func
                if(typeof data[0] == "string"){
                    tmp_func = (item:string)=>{tmp_options =([...tmp_options, {label: item, value: item}])}
                }if (typeof data[0] == "object" ) {
                    tmp_func = (item:any)=>{tmp_options =([...tmp_options, {label: item.name, value: item.id}])}
                    
                }{
                data.map(tmp_func)
                }
                setOptions(tmp_options)
            }).catch((err)=>console.log(err))
    },[])  
    
    let items:any = [{
        key: '1',
        label: name,
        children: 
          <>         
           <Select
           disabled={!enable}
            mode="multiple"
            value={selected}
            onChange={(value,key)=>{
                setSelected(value)
            }}
            style={{ minWidth: '100%' }}
            placeholder="Please select"
            options={options}/>
          </>
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