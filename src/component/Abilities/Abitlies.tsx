import { Col, Collapse, Flex, Input, Row, Select, Table } from "antd"
import { BaseOptionType } from "antd/es/select"
import { SelectMultiCheck } from "../inputs/SelectMultiCheck/SelectMultiCheck"
import { useEffect, useState } from "react"
import Column from "antd/es/table/Column"

export const Abilities: React.FC<any> = ({sendToParent}) => {
    let [selectNames, setSelectNames] = useState([])
    let [selectTrigger, setSelectTrigger] = useState([])
    let [selectTarget, setSelectTarget] = useState([])
    let [selectEffect, setSelectEffect] = useState([])
    let [abilities, setAbilities] = useState([])
    let [selectedAbilities, setSelectedAbilities] = useState([])
    const [value, setValue] = useState('');
    const rowSelection = {};



    function refreshData(){
        let url = `${process.env.REACT_APP_API_URL}/abilities`;
        let filter:any = {}
        if(selectNames.length > 0) filter["names"] = selectNames
        if(selectTrigger.length > 0) filter["triggers"] = selectTrigger
        if(selectTarget.length > 0) filter["targets"] = selectTarget
        if(selectEffect.length > 0) filter["effects"] = selectEffect

        if (Object.keys(filter).length > 0) {
            url += "?filter=" + JSON.stringify(filter)
        }
        fetch(url).then(res => res.json()).then(data => {
            setAbilities(data)
            let selected = data.map((ability:any) => ability.id)
            setSelectedAbilities(selected)
            sendToParent(selected)
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
          <Table 
            rowKey={"id"}
            dataSource={abilities}
            scroll={{ x: 2000, y: 500 }}
            
            rowSelection={{
              type: "checkbox",
              selectedRowKeys: selectedAbilities,
              onSelect: (record:any, selected:any, selectedRows:any, nativeEvent:any) => {
                let selectedRowKeys = selectedRows.map((row:any) => row.id);
                sendToParent(selectedRowKeys);setSelectedAbilities(selectedRowKeys)
              }, 
              onSelectAll: (selectedBool:Boolean, selectedRows:any, changeRows:any) => {
                let selected:any =  selectedBool? abilities.map((row:any) => row.id): []
                sendToParent(selected);
                setSelectedAbilities(selected)
              },
            }}
          >
            <Column title="Name" dataIndex="name" key="name" width={"200px"}/>
            <Column title="flavorText" dataIndex="flavorText" key="flavorText" />
          </Table>
          </Col>
        </Row>
        </>
    )
}