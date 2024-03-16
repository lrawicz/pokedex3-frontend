import { Col, Collapse, Flex, Input, Row, Select, Table } from "antd"
import { BaseOptionType } from "antd/es/select"
import { SelectMultiCheck } from "../inputs/SelectMultiCheck/SelectMultiCheck"
import { useEffect, useState } from "react"
import Column from "antd/es/table/Column"
import { TableWithFeatures } from "../TableWithFeatures/TableWithFeatures"

export const Abilities: React.FC<any> = ({ callback,generation}) => {
  
    let [abilitiesByMechanic, setAbilitiesByMechanic] = useState([])
    let [selectedAbilities, setSelectedAbilities] = useState([])
    const [nameSearch, setNameSearch] = useState('');
    const rowSelection = {};
    let [data,setData] = useState({})

    let callbackTable = (value:any)=>{
      console.log(value)
      setSelectedAbilities(value)
      callback("abilities",value)
    }
    let callFromChild = (key:string,type:string, value:any)=>{    
      let tmp
      if (value){
        tmp = {...data, [key]: value}
      }else{
        tmp = {...data}
        delete tmp[key]
      }
      setData(tmp)
    }

    function refreshData(){
      let tmp = {...data, generation: generation}
      let url = `${process.env.REACT_APP_API_URL}/abilities?filter=${JSON.stringify(tmp)}`
      fetch(url).then(res => res.json()).then(data => {
          setAbilitiesByMechanic(data)
          let selected = data.map((ability:any) => ability.id)
          callback("abilities",selected)
      })
    }



    useEffect(() => {refreshData()}, [data])
    return(
        <>
        <Row>
          <Col style={{width:"50%"}}>
            <Row>
              <h2>Abilities</h2>
            </Row>
            
            <Row>
              <Col span={8}>
                <SelectMultiCheck 
                  dbName={"triggers"} 
                  label={"trigger"} 
                  urlSource={`${process.env.REACT_APP_API_URL}/triggers`}
                  callback={callFromChild} />
              </Col>
              <Col span={8}>
                <SelectMultiCheck 
                  dbName={"targets"} 
                  label={"target"} 
                  urlSource={`${process.env.REACT_APP_API_URL}/targets`}
                  callback={callFromChild}  />
              </Col>
              <Col span={8}>
              <SelectMultiCheck 
                  dbName={"effects"} 
                  label={"effect"} 
                  urlSource={`${process.env.REACT_APP_API_URL}/effects`}
                  callback={callFromChild} />

              </Col>

            </Row>
          </Col>
          <Col style={{width:"50%"}}>
            <TableWithFeatures
              columns={[{title:"flavorText", dataIndex:"flavorText", key:"flavorText"}]}
              originalData={abilitiesByMechanic}
              callback={callbackTable}
            />
          </Col>
        </Row>
        </>
    )
}