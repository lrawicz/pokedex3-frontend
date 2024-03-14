import { Checkbox, Col, Collapse, Flex, Input, InputNumber, Row, Slider, Table } from "antd"
import { InputNumberCheck } from "../../inputs/InputNumberCheck/InputNumberCheck";
import { SelectMultiCheck } from "../../inputs/SelectMultiCheck/SelectMultiCheck";
import { useEffect, useState } from "react";
import { RangedCollapse } from "../../inputs/RangedCollapse/RangedCollapse";
type params = {
  callback:any,
  moveId:number
}
export const Move:  React.FC<params>  = ({callback,moveId}) => {
    let [data,setData] = useState([{}])
    let [moveList,setMoveList] = useState([{}])
    let [selectedMoves,setSelectedMoves] = useState([])

    useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_URL}/moves?filter=${JSON.stringify(data)}`).then((res)=>res.json()).then((moves)=>{
        setMoveList(moves)
      })},[data])
    let callFromChild = (key:string,type:string, value:any)=>{ 
        let tmp
        if (value){
          tmp = {...data, [key]: {type:type,value:value}}
        }else{
          tmp = {...data}
          delete tmp[key]
        }
        console.log(tmp)
        setData(tmp)
    }
    const columns = [
        {title: 'Name',dataIndex: 'name',key: 'name',},
        {title: 'power',dataIndex: 'power',key: 'power'},
        {title: 'type',dataIndex: 'type',key: 'type',},
        {title: 'damageClass',dataIndex: 'damageClass',key: 'damageClass',},
    ];
      
    const dataSource = [
        {
          id: '1',
          name: 'Mike',
          power: 32,
          type: '10 Downing Street',
        },
        {
          id: '2',
          name: 'John',
          power: 42,
          type: '10 Downing Street',
        },
    ];
    const items: any = [
        {
          key: '1',
          label: 'Results',
          children: <Table key={"id"} dataSource={moveList} columns={columns}/>,
        },

    ];

    let paremetersDOM = ()=>{
      return(
        <>        
          <Row>
            <Col span={6} children={<RangedCollapse dbName="power" min={0} max={255} marks={[40,120,200]} label="power" callback={callFromChild}/>}/>
            <Col span={6} children={ <SelectMultiCheck dbName="type" label="type"  callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/pokemon/types`}  />}/>
            <Col span={6} children={<RangedCollapse dbName="accuracy" label="accuracy" min={0} max={100} marks={[40,80]}step={5} callback={callFromChild} />}/>
            <Col span={6} children={ <SelectMultiCheck dbName="damageClass" label="damageClass" callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/moves/getDamageClass`} />}/>
          </Row>

          <Row>
            <Col span={6} children={<SelectMultiCheck dbName="target" label="target" callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/moves/getTargetTypes`} />}/>
            <Col span={6} children={<InputNumberCheck dbName="priority" label="priority" step={1} min={-7} max={8} callback={callFromChild}/>} />
            <Col span={6} children={<InputNumberCheck dbName="CritRate" label="CritRate" min={0} max={100} callback={callFromChild}/>}/>
            <Col span={6} children={<InputNumberCheck dbName="pp" label="pp"  callback={callFromChild}/> }/>
          </Row>
          
          <Row>
            <Col span={6} children={<InputNumberCheck dbName="minHits" label="minHits"  min={1} max={10} callback={callFromChild}/>}/>
            <Col span={6} children={<InputNumberCheck dbName="maxHits" label="maxHits"  callback={callFromChild} min={1} max={10}/>}/>
            <Col span={6} children={<InputNumberCheck dbName="minTurns" label="minTurns"  callback={callFromChild} min={1} max={20}/>}/>
            <Col span={6} children={<InputNumberCheck dbName="maxTurns" label="maxTurns"  callback={callFromChild} min={1} max={20}/>}/>
          </Row>
    
          <Row>
            <Col span={6} children={<InputNumberCheck dbName="drain" label="drain" callback={callFromChild} min={0} max={100}/>}/>
            <Col span={6} children={<InputNumberCheck dbName="healing" label="healing" callback={callFromChild} />}/>
            <Col span={6} children={<InputNumberCheck dbName="recoil" label="recoil"  callback={callFromChild} min={0} max={100}/>}/>
            <Col span={6} children={<InputNumberCheck dbName="maxTurns" label="flinchChance" callback={callFromChild} min={0} max={100}/>}/>
          </Row>

          <Row>
            <Col span={6} children={<SelectMultiCheck dbName="ailment" label="ailment"  callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/moves/getAilments`}/>}/>
            <Col span={6} children={<InputNumberCheck dbName="ailmentChance" label="ailmentChance" callback={callFromChild} min={0} max={100}/>}/>
            <Col span={6} children={<InputNumberCheck dbName="statChanges" label="statChanges"  callback={callFromChild} />}/> {/*revisar*/}
            <Col span={6} children={<InputNumberCheck dbName="statChance" label="statChance" callback={callFromChild} min={0} max={100}/>}/>
          </Row>
    </>
      )
    }
    ///////
    //review
        //statChanges Json  //statChanges: data.stat_changes,
        //effectChance: data.effect_chance,

    //
    // at least (max 100)
    /*
        effectChance Int?
        metaStatChance Int?
    */

    //comboSelect:
    /*

        metaAilment
      */  
        
    //move_moveGrups Json
        //metaCategory String?

    return(<>
      <Row >
        <Col span={12}>
        <Table 
          rowKey={"id"}
          dataSource={moveList} columns={columns}
          scroll={{ x: 150, y: 500 }}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selectedMoves,
            onSelect: (record:any, selected:any, selectedRows:any, nativeEvent:any) => {
              let selectedRowKeys = selectedRows.map((row:any) => row.id);
              callback("abilities",selectedRowKeys);
              setSelectedMoves(selectedRowKeys)
            }, 
            onSelectAll: (selectedBool:Boolean, selectedRows:any, changeRows:any) => {
              let selected:any =  selectedBool? moveList.map((row:any) => row.id): []
              callback("abilities",selected);
              setSelectedMoves(selected)
            },
          }}
          
          />
        </Col>
        <Col span={12}>
          {paremetersDOM()}
        </Col>
      </Row>

    </>)
}