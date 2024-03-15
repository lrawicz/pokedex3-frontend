import { Collapse } from "antd"
import { Move } from "./Move/Move";
import { useState } from "react";


type params = {
  callback:any
}
export const Moves:  React.FC<params>= ({callback}) => {
    let [moves,setMoves] = useState({"move01":[],"move02":[],"move03":[],"move04":[]})
    let sentToParent = (key:string,type:string, value:any)=>{
        let tmp = {...moves,[key]:value}
        console.log(tmp)
        setMoves(tmp)
        callback("moves",tmp)
    }
    const items: any = [
        {
          key: '1',
          label: 'Move 1',
          children: <Move moveId={1} callback={sentToParent}/>,
        },
        {
          key: '2',
          label: 'Move 2',
          children: <Move moveId={2} callback={sentToParent}/>,
        },
        {
          key: '3',
          label: 'Move 3',
          children: <Move moveId={3} callback={sentToParent}/>,
        },
        {
            key: '4',
            label: 'move 4',
            children: <Move moveId={4} callback={sentToParent}/>,
          },
      ];
    return(
        <>
        <Collapse items={items} defaultActiveKey={['1']} />
        </>
    )
}