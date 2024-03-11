import { Checkbox, Col, Collapse, Flex, Grid, InputNumber, Row, Select, Slider } from "antd"
import { BaseOptionType } from "antd/es/select"
import { useState } from "react"


export const InputNumberCheck: React.FC<{ name: string, span?:number }> = ({name="asd",span=6}) => {
    let [disable, setDisable]= useState(false)
    let items:any = [{
        key: '1',
        label: name,
        children: 
          <>         

              <Select
                  defaultValue="="
                  disabled={!disable}
                  options={[
                      {label: "=", value: "="},
                      {label: ">=", value: ">="},
                      {label: "<=", value: "<="},
                  ]}
              />
              <InputNumber min={1} max={100} step={5} disabled={!disable} defaultValue={60}/>
          </>
    }]
    return (
        <Col  className="gutter-row"  span={span} >
            <Collapse 
                items={items}  
                defaultActiveKey={[]}  
                onChange={()=>setDisable(!disable)}
                style={disable?{backgroundColor: '#44bba4'}:{}}
                />
        </Col>
    )
}