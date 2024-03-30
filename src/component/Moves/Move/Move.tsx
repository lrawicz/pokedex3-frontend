import { Tabs } from "antd"
import { useEffect, useState } from "react";
import { TableWithFeatures } from "../../TableWithFeatures/TableWithFeatures";
import { MoveParameters } from "./MoveParameters";
import type { TabsProps } from 'antd';
type params = {
  callback:any,
  moveId:number
}
export const Move:  React.FC<params>  = ({callback,moveId}) => {
    let [moveList,setMoveList] = useState([{}])
    let [params,setParams] = useState({})

    useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_URL}/moves?filter=${JSON.stringify(params)}`).then((res)=>res.json()).then((moves)=>{
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
        {title: 'Power',dataIndex: 'power',key: 'power', width: '100px',},
        {title: 'Type',dataIndex: 'type',key: 'type', width: '100px'},
        {title: 'Damage class',dataIndex: 'damageClass',key: 'damageClass', width: '150px'},
        {title: 'Flavor text',dataIndex: 'flavorText',key: 'flavorText',},
    ];
    
    const items: TabsProps['items'] = [
      {
        key: '1',
        label: 'Filters',
        children: <MoveParameters callback={callbackParameters}/>,
      },
      {
        key: '2',
        label: 'Results',
        forceRender:true,
        children: 
          <TableWithFeatures
            columns={columns}
            originalData={moveList}
            callback={callbackTable}
            scroll={{x:600,y:500}}
          />,
      }
    ];


    return(<Tabs defaultActiveKey="1"  items={items} />)
}