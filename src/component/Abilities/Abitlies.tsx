import { Col, Collapse, Flex, Row, Select, Table } from "antd"
import { BaseOptionType } from "antd/es/select"
import { SelectMultiCheck } from "../inputs/SelectMultiCheck/SelectMultiCheck"
import { useEffect, useState } from "react"
import Column from "antd/es/table/Column"

export const Abilities: React.FC<any> = ({abilities,setAbilities}) => {
    let [selectNames, setSelectNames] = useState([])
    let [selectTrigger, setSelectTrigger] = useState([])
    let [selectTarget, setSelectTarget] = useState([])
    let [selectEffect, setSelectEffect] = useState([])
    function refreshData(){
        let url = `${process.env.REACT_APP_API_URL}/abilities`;
        let filter:any = {}
        if(selectNames.length > 0){
            filter["names"] = selectNames
        }
        if(selectTrigger.length > 0){
            filter["triggers"] = selectTrigger
        }
        if(selectTarget.length > 0){
            filter["targets"] = selectTarget
        }
        if(selectEffect.length > 0){
            filter["effects"] = selectEffect
        }
        if (Object.keys(filter).length > 0) {
            url += "?filter=" + JSON.stringify(filter)
        }
        fetch(url).then(res => res.json()).then(data => {
            setAbilities(data)
        })
    }
    useEffect(() => {refreshData()}, [selectNames, selectTrigger, selectTarget, selectEffect])
    return(
        <>
        <Row>
          <Col style={{width:"50%"}}>
            <Row>
              <h2>Abilities</h2>
            </Row>
            <Row>
              <SelectMultiCheck 
                name={"names"} />
            </Row>
            <Row>
              <Col span={8}>
                <SelectMultiCheck name={"trigger"} urlSource={`${process.env.REACT_APP_API_URL}/triggers`}
                  selected={selectTrigger} setSelected={setSelectTrigger}/>
              </Col>
              <Col span={8}>
                <SelectMultiCheck name={"target"} urlSource={`${process.env.REACT_APP_API_URL}/targets`}
                  selected={selectTarget} setSelected={setSelectTarget}/>
              </Col>
              <Col span={8}>
              <SelectMultiCheck name={"effect"} urlSource={`${process.env.REACT_APP_API_URL}/effects`}
                  selected={selectEffect} setSelected={setSelectEffect}/>

              </Col>

            </Row>
          </Col>
          <Col style={{width:"50%"}}>
          <Table dataSource={abilities}>
            <Column title="Name" dataIndex="name" key="name" />
          </Table>
          </Col>
        </Row>
        </>
    )
}