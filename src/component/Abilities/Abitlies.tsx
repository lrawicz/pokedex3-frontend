import { Col, Collapse, Flex, Row, Select } from "antd"
import { BaseOptionType } from "antd/es/select"
import { SelectMultiCheck } from "../inputs/SelectMultiCheck/SelectMultiCheck"
import { useState } from "react"

export const Abilities: React.FC = () => {
    let [selectNames, setSelectNames] = useState([])
    let [selectTrigger, setSelectTrigger] = useState([])
    let [selectTarget, setSelectTarget] = useState([])
    let [selectEffect, setSelectEffect] = useState([])
    
    return(
        <>
        <Col>

          <Row>
            <h2>Abilities</h2>
          </Row>
          <Row>
            <SelectMultiCheck 
              name={"names"} />

          </Row>
          <Row>
            <SelectMultiCheck name={"trigger"} urlSource={`${process.env.REACT_APP_API_URL}/triggers`}
              selected={selectTrigger} setSelected={setSelectTrigger}/>


          </Row>
          <Row>
            <SelectMultiCheck name={"target"} urlSource={`${process.env.REACT_APP_API_URL}/targets`}
              selected={selectTarget} setSelected={setSelectTarget}/>
            </Row>
          <Row>
          <SelectMultiCheck name={"effect"} urlSource={`${process.env.REACT_APP_API_URL}/effects`}
              selected={selectEffect} setSelected={setSelectEffect}/>

          </Row>
        </Col>
        </>
    )
}