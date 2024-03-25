import {  Collapse, Select } from "antd"
import { BaseOptionType } from "antd/es/select"
import { useEffect, useState } from "react"

type params = {
    dbName:string,
    label:string,
    span?:number,
    urlSource?:string,
    selected?: string[],
    setSelected?: any,
    metaEnable?:boolean,
    callback?:any
}

export const SelectMultiCheck: React.FC<params> = ({dbName,label,span=6, urlSource=`${process.env.API_URL}/effects`,metaEnable=true,callback}) =>{
    
    let [enable, setEnable]= useState(false)
    let [selected, setSelected]= useState([])
    let [options, setOptions]= useState<BaseOptionType[]>([])

    let onSelectChange = (value:any,items:any)=>{
        let tmp = items.map((item:any)=>{
            return Number(item.key) ? item.key : item.key.replace("+","\+")
        })
        setSelected(items)
        callback(dbName,"ids",tmp)
    }
    let collapseOnChange = (value:any)=>{
        if(JSON.stringify(value) === "[]"){
            setEnable(false)
            callback(dbName,"ids",false)
        }else{
            setEnable(true)
            callback(dbName,"ids",selected.map((item:any)=>item.key))
        }
    }
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
                    tmp_func = (item:string)=>{tmp_options =([...tmp_options, {label: item, value: item,key:item}])}
                }if (typeof data[0] == "object" ) {
                    tmp_func = (item:any)=>{tmp_options =([...tmp_options, {label: item.name, value: item.name, key:item.id}])}
                }
                data.map(tmp_func)
                setOptions(tmp_options)
            }).catch((err)=>console.log(err))
    },[])  
    
    let items:any = [{
        key: '1',
        label: label,
        children: 
          <>         
           <Select
           disabled={!enable}
            mode="multiple"
            value={selected}
            onChange={onSelectChange}
            style={{ minWidth: '100%' }}
            placeholder="Please select"
            options={options}/>
          </>
    }]
    return (
        <Collapse 
            collapsible={metaEnable?"header":"disabled"} 
            items={items}  
            defaultActiveKey={[]}  
            onChange={collapseOnChange}
            style={enable?{backgroundColor: '#44bba4'}:{}}
            />
    )
}