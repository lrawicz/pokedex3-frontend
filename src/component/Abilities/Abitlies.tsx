import { Col, Collapse, Flex, Input, Row, Select, Table } from "antd"
import { BaseOptionType } from "antd/es/select"
import { SelectMultiCheck } from "../inputs/SelectMultiCheck/SelectMultiCheck"
import { useEffect, useState } from "react"
import Column from "antd/es/table/Column"

export const Abilities: React.FC<any> = ({ callback,generation}) => {
  
    let [abilities, setAbilities] = useState([])
    let [selectedAbilities, setSelectedAbilities] = useState([])
    let [dataSource ,setDataSource] = useState([])
    const [value, setValue] = useState('');
    const rowSelection = {};
    let [data,setData] = useState({})
    let callFromChild = (key:string,type:string, value:any)=>{    
      let tmp
      if (value){
        tmp = {...data, [key]: value.map((item:any) => item.key)}
      }else{
        tmp = {...data}
        delete tmp[key]
      }
      setData(tmp)
    }

    function refreshData(){
      let tmp = {...data, generation: generation}
      let url = `${process.env.REACT_APP_API_URL}/abilities?filter=${JSON.stringify(tmp)}`
      console.log(url)
      fetch(url).then(res => res.json()).then(data => {
          setAbilities(data)
          let selected = data.map((ability:any) => ability.id)
          setSelectedAbilities(selected)
          callback("abilities",selected)
      })
    }

    const FilterByNameInput = (
      <Input
        placeholder="Name"
        value={value}
        onChange={e => {
          const currValue = e.target.value;
          setValue(currValue);
          const filteredData = abilities.filter((entry:any) =>
            entry.name.includes(currValue)
          );
          setDataSource(filteredData);
        }}
      />
    );

    useEffect(() => {refreshData()}, [data,generation])
    return(
        <>
        <Row>
          <Col style={{width:"50%"}}>
            <Row>
              <h2>Abilities</h2>
            </Row>
            
            <Row>
              <Col span={8}>
                <SelectMultiCheck dbName={"triggers"} label={"trigger"} urlSource={`${process.env.REACT_APP_API_URL}/triggers`}
                  callback={callFromChild} />
              </Col>
              <Col span={8}>
                <SelectMultiCheck dbName={"targets"} label={"target"} urlSource={`${process.env.REACT_APP_API_URL}/targets`}
                  callback={callFromChild}  />
              </Col>
              <Col span={8}>
              <SelectMultiCheck dbName={"effects"} label={"effect"} urlSource={`${process.env.REACT_APP_API_URL}/effects`}
                  callback={callFromChild} />

              </Col>

            </Row>
          </Col>
          <Col style={{width:"50%"}}>
            <Table 
              rowKey={"id"}
              dataSource={dataSource.length ? dataSource : abilities}
              scroll={{ x: 2000, y: 500 }}
              
              rowSelection={{
                type: "checkbox",
                selectedRowKeys: selectedAbilities,
                onSelect: (record:any, selected:any, selectedRows:any, nativeEvent:any) => {
                  let selectedRowKeys = selectedRows.map((row:any) => row.id);
                  callback("abilities",selectedRowKeys);
                  setSelectedAbilities(selectedRowKeys)
                }, 
                onSelectAll: (selectedBool:Boolean, selectedRows:any, changeRows:any) => {
                  let selected:any =  selectedBool? abilities.map((row:any) => row.id): []
                  if(selectedBool){
                    selected = dataSource.length ? 
                              dataSource.map((row:any) => row.id) :
                              abilities.map((row:any) => row.id);
                  }else{
                      selected= []
                  }
                  callback("abilities",selected);
                  setSelectedAbilities(selected)
                },
              }}
            >
            <Column title={FilterByNameInput} dataIndex="name" key="name" width={"200px"}/>
            <Column title="flavorText" dataIndex="flavorText" key="flavorText" />
          </Table>
          </Col>
        </Row>
        </>
    )
}