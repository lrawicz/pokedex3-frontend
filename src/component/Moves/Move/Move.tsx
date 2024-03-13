import { Checkbox, Col, Collapse, Flex, Input, InputNumber, Row, Slider, Table } from "antd"
import { InputNumberCheck } from "../../inputs/InputNumberCheck/InputNumberCheck";
import { SelectMultiCheck } from "../../inputs/SelectMultiCheck/SelectMultiCheck";
import { useEffect, useState } from "react";
import { RangedCollapse } from "../../inputs/RangedCollapse/RangedCollapse";

export const Move: React.FC = () => {
    let [selectPokemonType, setSelectPokemonType] = useState([])

    let [selectMovesName, setSelectMovesName] = useState([])
    let [selectDamageClass, setSelectDamageClass] = useState([])
    let [selectTargetTypes, setSelectTargetTypes] = useState([])
    let [selectAilments, setSelectAilments] = useState([])
    let [data,setData] = useState([{}])
    let [moveList,setMoveList] = useState([{}])


    useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_URL}/moves?filter=${JSON.stringify(data)}`).then((res)=>res.json()).then((moves)=>{
        setMoveList(moves)
      })},[data])
    let callFromChild = (name:string,type:string, value:any)=>{ 
        let tmp
        if (value){
          tmp = {...data, [name]: {type:type,value:value}}
        }else{
          tmp = {...data}
          delete tmp[name]
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
            <Col span={6} children={<InputNumberCheck name="power" callback={callFromChild}/>}/>
            <Col span={6} children={ <SelectMultiCheck name="type" callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/pokemon/types`} selected={selectPokemonType} setSelected={setSelectPokemonType} />}/>
            <Col span={6} children={<InputNumberCheck name="accuracy" callback={callFromChild}/>}/>
            <Col span={6} children={ <SelectMultiCheck name="damageClass" callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/moves/getDamageClass`} selected={selectDamageClass} setSelected={setSelectDamageClass}/>}/>
          </Row>

          <Row>
            <Col span={6} children={<SelectMultiCheck name="target" callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/moves/getTargetTypes`} selected={selectTargetTypes} setSelected={setSelectTargetTypes}/>}/>
            <Col span={6} children={<InputNumberCheck name="priority" min={-7} max={8} callback={callFromChild}/>} />
            <Col span={6} children={<InputNumberCheck name="CritRate" min={0} max={100} callback={callFromChild}/>}/>
            <Col span={6} children={<InputNumberCheck name="pp"  callback={callFromChild}/> }/>
          </Row>
          
          <Row>
            <Col span={6} children={<InputNumberCheck name="minHits" min={1} max={10} callback={callFromChild}/>}/>
            <Col span={6} children={<InputNumberCheck name="maxHits" callback={callFromChild} min={1} max={10}/>}/>
            <Col span={6} children={<InputNumberCheck name="minTurns" callback={callFromChild} min={1} max={20}/>}/>
            <Col span={6} children={<InputNumberCheck name="maxTurns" callback={callFromChild} min={1} max={20}/>}/>
          </Row>
    
          <Row>
            <Col span={6} children={<InputNumberCheck name="drain %"  callback={callFromChild} min={0} max={100}/>}/>
            <Col span={6} children={<InputNumberCheck name="healing" callback={callFromChild} />}/>
            <Col span={6} children={<InputNumberCheck name="recoil (%)"  callback={callFromChild} min={0} max={100}/>}/>
            <Col span={6} children={<InputNumberCheck name="flinchChance" callback={callFromChild} min={0} max={100}/>}/>
          </Row>

          <Row>
            <Col span={6} children={<SelectMultiCheck name="ailment" callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/moves/getAilments`}selected={selectAilments} setSelected={setSelectAilments}/>}/>
            <Col span={6} children={<InputNumberCheck name="ailmentChance" callback={callFromChild} min={0} max={100}/>}/>
            <Col span={6} children={<InputNumberCheck name="statChanges" callback={callFromChild} />}/> {/*revisar*/}
            <Col span={6} children={<InputNumberCheck name="statChance" callback={callFromChild} min={0} max={100}/>}/>
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
    <Collapse items={[
        {
          key: '1',
          label: 'Table',
          children: <Table 
          rowKey={"id"}
          dataSource={moveList} columns={columns}
          rowSelection={{
            type: "checkbox"
          }}
          
          />,
        },
        {
          key: '2',
          label: 'Extra Parameters',
          children: paremetersDOM(),
        }
      ]} defaultActiveKey={[]} />
    

    </>)
}