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
        let tmp:any
        if (value){
          if(type=="ids"){
            tmp = {...data, [key]: {type:type,value:value}}
            //tmp = {...data, [key]: value.map((item:any) => item.key)}

              //tmp = {...data, [key]: ({type:type,value:value.map((item:any) => item.key)}||[])}
          }
          if(type=="value"){
            tmp = {...data, [key]: value.map((item:any) => item.key)}

            tmp = {...data, [key]: {type:type,value:value}}
          }
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
            <Col span={6} children={<RangedCollapse dbName="accuracy" label="accuracy" min={0} max={100} marks={[30,50,70,90]}step={5} callback={callFromChild} />}/>
            <Col span={6} children={ <SelectMultiCheck dbName="damageClass" label="damageClass" callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/moves/getDamageClass`} />}/>
          </Row>

          <Row>
            <Col span={6} children={<SelectMultiCheck dbName="target" label="target" callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/moves/getTargetTypes`} />}/>
            <Col span={6} children={<RangedCollapse dbName="priority" label="priority" step={1} marks={[-7,0,8]} min={-7} max={8} callback={callFromChild}/>} />
            <Col span={6} children={<RangedCollapse dbName="metaCritRate" label="indice de critico" step={1} min={0} max={6} marks={[0,3,6]} callback={callFromChild}/>}/>
            <Col span={6} children={<RangedCollapse dbName="pp" label="pp"  min={1} max={40} step={5} marks={[1,20,40]}callback={callFromChild}/> }/>
          </Row>
          
          <Row>
            <Col span={6} children={<RangedCollapse dbName="metaMinHits" label="minHits"  min={1} max={10} step={1} marks={[1,5,10]} callback={callFromChild}/>}/>
            <Col span={6} children={<RangedCollapse dbName="metaMaxHits" label="maxHits"   min={1} max={10} step={1} marks={[1,5,10]} callback={callFromChild} />}/>
            <Col span={6} children={<RangedCollapse dbName="metaMinTurns" label="minTurns"  min={1} max={20} step={1} marks={[1,10,20]}  callback={callFromChild}/>}/>
            <Col span={6} children={<RangedCollapse dbName="metaMaxTurns" label="maxTurns" min={1} max={20} step={1} marks={[1,10,20]}  callback={callFromChild} />}/>
          </Row>
    
          <Row>
            <Col span={6} style={{background:"red"}} children={<InputNumberCheck dbName="drain" label="drain" callback={callFromChild} min={0} max={100}/>}/>
            <Col span={6} children={<RangedCollapse dbName="metaHealing" label="healing" min={0} max={100} step={1} marks={[0,50,100]} callback={callFromChild} />}/>
            <Col span={6} style={{background:"red"}} children={<InputNumberCheck dbName="recoil" label="recoil"  callback={callFromChild} min={0} max={100}/>}/>
            <Col span={6} children={<RangedCollapse dbName="metaFlinchChance" label="flinchChance" min={0} max={100} step={1} marks={[0,50,100]} callback={callFromChild} />}/>
          </Row>

          <Row>
            <Col span={6} children={<SelectMultiCheck dbName="metaAilment" label="ailment"  callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/moves/getAilments`}/>}/>
            <Col span={6} children={<RangedCollapse dbName="metaAilmentChance" label="ailmentChance" min={0} max={100} marks={[0,50,100]}callback={callFromChild}  />}/>
            <Col span={6} style={{background:"red"}} children={<InputNumberCheck dbName="metaStatChanges" label="statChanges"  callback={callFromChild} />}/> {/*revisar*/}
            <Col span={6} children={<RangedCollapse dbName="metaStatChance" label="statChance" min={0} max={100} marks={[0,50,100]} callback={callFromChild} />}/>
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
          {paremetersDOM()}
        </Col>
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

      </Row>

    </>)
}