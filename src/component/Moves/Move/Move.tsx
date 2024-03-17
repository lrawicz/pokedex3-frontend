import { Checkbox, Col, Collapse, Flex, Input, InputNumber, Row, Slider, Table } from "antd"
import { InputNumberCheck } from "../../inputs/InputNumberCheck/InputNumberCheck";
import { SelectMultiCheck } from "../../inputs/SelectMultiCheck/SelectMultiCheck";
import { useEffect, useState } from "react";
import { RangedCollapse } from "../../inputs/RangedCollapse/RangedCollapse";
import { TableWithFeatures } from "../../TableWithFeatures/TableWithFeatures";
import { MoveParameters } from "./MoveParameters";
type params = {
  callback:any,
  moveId:number
}
export const Move:  React.FC<params>  = ({callback,moveId}) => {
    let [moveList,setMoveList] = useState([{}])
    let [params,setParams] = useState({})

    useEffect(()=>{
      console.log(JSON.stringify(params))
      fetch(`${process.env.REACT_APP_API_URL}/moves?filter=${JSON.stringify(params)}`).then((res)=>res.json()).then((moves)=>{
        console.log(moves)
        setMoveList(moves)
      })
      },[params]
    )

    let callbackTable = (value:any)=>{
      callback(`move0${moveId}`,"ids",value)
    }
    let callbackParameters = (value:any)=>{
      setParams(value)
    }

    const columns = [
        {title: 'power',dataIndex: 'power',key: 'power'},
        {title: 'type',dataIndex: 'type',key: 'type',},
        {title: 'damageClass',dataIndex: 'damageClass',key: 'damageClass',},
    ];




    return(<>
      <Row >
        <Col span={12}>
          <MoveParameters callback={callbackParameters}/>
        </Col>
        <Col span={12}>
          <TableWithFeatures
                columns={columns}
                originalData={moveList}
                callback={callbackTable}
                scroll={{x:600,y:500}}
          />
        </Col>

      </Row>

    </>)
}