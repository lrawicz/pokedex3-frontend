import { Collapse } from "antd"
import { Move } from "./Move/Move";
import { useState } from "react";


type params = {
  callback:any
  generation:number
}
export const Moves:  React.FC<params>= ({callback,generation}) => {
    let [moves,setMoves] = useState({"move01":[],"move02":[],"move03":[],"move04":[]})
    let [data,setData] = useState([""])
    let sentToParent = (key:string,type:string, value:any)=>{
        let tmp = {...moves,[key]:value}
        setMoves(tmp)
        callback("moves",tmp)
    }
    const items: any = [
        {
          key: '1',
          label: 'Move 1',
          style:  data.includes("1") ? {background: '#44bba4'} :{},
          children: <Move moveId={1} generation={generation} callback={sentToParent} 
          />,
        },
        {
          key: '2',
          label: 'Move 2',
          style:  data.includes("2") ? {background: '#44bba4'} :{},
          children: <Move moveId={2} generation={generation} callback={sentToParent} />,
        },
        {
          key: '3',
          label: 'Move 3',
          style:  data.includes("3") ? {background: '#44bba4'} :{},
          children: <Move moveId={3} generation={generation} callback={sentToParent} />,
        },
        {
          key: '4',
          label: 'move 4',
          style:  data.includes("4") ? {background: '#44bba4'} :{},
          children: <Move moveId={4} generation={generation} callback={sentToParent} />,
        },
      ];
    return(
        <>
        <Collapse items={items} defaultActiveKey={[]} 
          onChange={(key:string|string[])=>{
            if (key instanceof Array){
              setData(key)
              let tmp:any = moves
              for (let i = 1; i < 5; i++) {
                 if (!key.includes(i.toString())){
                    tmp[`move0${i}`] = []
                 }
              }
              callback("moves",tmp)
            } 
          }}
        />
        </>
    )
}