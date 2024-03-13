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
            <Col span={6} children={<InputNumberCheck key="power" label="power" callback={callFromChild}/>}/>
            <Col span={6} children={ <SelectMultiCheck key="type" label="type"  callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/pokemon/types`} selected={selectPokemonType} setSelected={setSelectPokemonType} />}/>
            <Col span={6} children={<InputNumberCheck key="accuracy" label="accuracy" step={5} callback={callFromChild} />}/>
            <Col span={6} children={ <SelectMultiCheck key="damageClass" label="damageClass" callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/moves/getDamageClass`} selected={selectDamageClass} setSelected={setSelectDamageClass}/>}/>
          </Row>

          <Row>
            <Col span={6} children={<SelectMultiCheck key="target" label="target" callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/moves/getTargetTypes`} selected={selectTargetTypes} setSelected={setSelectTargetTypes}/>}/>
            <Col span={6} children={<InputNumberCheck key="priority" label="priority" step={1} min={-7} max={8} callback={callFromChild}/>} />
            <Col span={6} children={<InputNumberCheck key="CritRate" label="CritRate" min={0} max={100} callback={callFromChild}/>}/>
            <Col span={6} children={<InputNumberCheck key="pp" label="pp"  callback={callFromChild}/> }/>
          </Row>
          
          <Row>
            <Col span={6} children={<InputNumberCheck key="minHits" label="minHits"  min={1} max={10} callback={callFromChild}/>}/>
            <Col span={6} children={<InputNumberCheck key="maxHits" label="maxHits"  callback={callFromChild} min={1} max={10}/>}/>
            <Col span={6} children={<InputNumberCheck key="minTurns" label="minTurns"  callback={callFromChild} min={1} max={20}/>}/>
            <Col span={6} children={<InputNumberCheck key="maxTurns" label="maxTurns"  callback={callFromChild} min={1} max={20}/>}/>
          </Row>
    
          <Row>
            <Col span={6} children={<InputNumberCheck key="drain" label="drain" callback={callFromChild} min={0} max={100}/>}/>
            <Col span={6} children={<InputNumberCheck key="healing" label="healing" callback={callFromChild} />}/>
            <Col span={6} children={<InputNumberCheck key="recoil" label="recoil"  callback={callFromChild} min={0} max={100}/>}/>
            <Col span={6} children={<InputNumberCheck key="maxTurns" label="flinchChance" callback={callFromChild} min={0} max={100}/>}/>
          </Row>

          <Row>
            <Col span={6} children={<SelectMultiCheck key="ailment" label="ailment"  callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/moves/getAilments`}selected={selectAilments} setSelected={setSelectAilments}/>}/>
            <Col span={6} children={<InputNumberCheck key="ailmentChance" label="ailmentChance" callback={callFromChild} min={0} max={100}/>}/>
            <Col span={6} children={<InputNumberCheck key="statChanges" label="statChanges"  callback={callFromChild} />}/> {/*revisar*/}
            <Col span={6} children={<InputNumberCheck key="statChance" label="statChance" callback={callFromChild} min={0} max={100}/>}/>
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