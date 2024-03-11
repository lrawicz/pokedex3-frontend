import { Checkbox, Col, Collapse, Flex, Input, InputNumber, Row, Slider, Table } from "antd"
import { InputNumberCheck } from "../../inputs/InputNumberCheck/InputNumberCheck";
import { SelectMultiCheck } from "../../inputs/SelectMultiCheck/SelectMultiCheck";
import { useState } from "react";

export const Move: React.FC = () => {
    let [selectPokemonType, setSelectPokemonType] = useState([])

    let [selectMovesName, setSelectMovesName] = useState([])
    let [selectDamageClass, setSelectDamageClass] = useState([])
    let [selectTargetTypes, setSelectTargetTypes] = useState([])
    let [selectAilments, setSelectAilments] = useState([])


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
          children: <Table key={"id"} dataSource={dataSource} columns={columns}/>,
        },

      ];
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
    <Col span={24} children={
    <SelectMultiCheck name="posible names" span={12}
      urlSource={`${process.env.REACT_APP_API_URL}/moves/getAllNames`}
      selected={selectMovesName} setSelected={setSelectMovesName}
    />}
    />

    </Row>
    <Row >
        <InputNumberCheck name="power"/>
        <Col span={6} children={
          <SelectMultiCheck name="type"
            urlSource={`${process.env.REACT_APP_API_URL}/pokemon/types`}
            selected={selectPokemonType} setSelected={setSelectPokemonType}
          />}
        />
        <InputNumberCheck name="accuracy"/>
        <Col span={6} children={
          <SelectMultiCheck name="damageClass"
              urlSource={`${process.env.REACT_APP_API_URL}/moves/getDamageClass`}
              selected={selectDamageClass} setSelected={setSelectDamageClass}
          />}
        />
    </Row>

    <Row >
        <Col span={6} children={
          <SelectMultiCheck name="target"
            urlSource={`${process.env.REACT_APP_API_URL}/moves/getTargetTypes`}
            selected={selectTargetTypes} setSelected={setSelectTargetTypes}
          />
        }/>
        <InputNumberCheck name="priority"/>
        <InputNumberCheck name="CritRate"/>
        <InputNumberCheck name="pp"/>
        
    </Row>
    <Row>
        <InputNumberCheck name="minHits"/>
        <InputNumberCheck name="maxHits"/>
        <InputNumberCheck name="minTurns"/>
        <InputNumberCheck name="maxTurns"/>


    </Row>
    <Row>
        <InputNumberCheck name="drain (%)"/>
        <InputNumberCheck name="healing"/>
        <InputNumberCheck name="recoil (%)"/>
        <InputNumberCheck name="flinchChance"/>
    </Row>
    <Row>
          <Col span={6} children={
            <SelectMultiCheck name="ailment"
              urlSource={`${process.env.REACT_APP_API_URL}/moves/getAilments`}
              selected={selectAilments} setSelected={setSelectAilments}
            />}
          />
        <InputNumberCheck name="ailmentChance"/>
        <InputNumberCheck name="statChanges"/>
        <InputNumberCheck name="statChance"/>

    </Row>
    <Row >
        <Collapse items={items} style={{width:"100%"}} >
            <Table style={{width:"100%"}} key={"id"} dataSource={dataSource} columns={columns}/>
        </Collapse>


    </Row>        
    </>)
}