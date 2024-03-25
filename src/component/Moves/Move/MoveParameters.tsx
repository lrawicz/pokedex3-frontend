import { Col, Row } from "antd"
import { RangedCollapse } from "../../inputs/RangedCollapse/RangedCollapse"
import { SelectMultiCheck } from "../../inputs/SelectMultiCheck/SelectMultiCheck"
import { useState } from "react"
type params = {
    callback:any
}
export const MoveParameters:  React.FC<params>  = ({callback}) => {
    let [data,setData] = useState({})

    
    let callFromChild = (key:string,type:string, value:any)=>{ 
        let tmp:any
        if (value){
          if(type==="ids"){
            tmp = {...data, [key]: {type:type,value:value}}
          }
          if(type==="value"){
            //tmp = {...data, [key]: value.map((item:any) => item.key)}

            tmp = {...data, [key]: {type:type,value:value}}
          }
        }else{
          tmp = {...data}
          delete tmp[key]
        }
        setData(tmp)
        callback(tmp)
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
    return(
      <>
         
        <Row>
          <Col span={12} children={<RangedCollapse dbName="power" label="Power" min={0} max={255} marks={[40,120,200]}  callback={callFromChild}/>}/>
          <Col span={12} children={<SelectMultiCheck dbName="type" label="Type"  callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/pokemon/types`}  />}/>
        </Row>
        <Row>
          <Col span={12} children={<RangedCollapse dbName="accuracy" label="Accuracy" min={0} max={100} marks={[30,50,70,90]}step={5} callback={callFromChild} />}/>
          <Col span={12} children={<SelectMultiCheck dbName="damageClass" label="DamageClass" callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/moves/getDamageClass`} />}/>
        </Row>


        <Row>
          <Col span={12} children={<SelectMultiCheck dbName="target" label="Target" callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/moves/getTargetTypes`} />}/>
          <Col span={12} children={<RangedCollapse dbName="priority" label="Priority" step={1} marks={[-7,0,8]} min={-7} max={8} callback={callFromChild}/>} />
        </Row>
        <Row>
          <Col span={12} children={<RangedCollapse dbName="metaCritRate" label="Indice de critico" step={1} min={0} max={6} marks={[0,3,6]} callback={callFromChild}/>}/>
          <Col span={12} children={<RangedCollapse dbName="pp" label="PP"  min={1} max={40} step={5} marks={[1,20,40]}callback={callFromChild}/> }/>
        </Row>
        
        <Row>
          <Col span={12} children={<RangedCollapse dbName="metaMinHits" label="MinHits"  min={1} max={10} step={1} marks={[1,5,10]} callback={callFromChild}/>}/>
          <Col span={12} children={<RangedCollapse dbName="metaMaxHits" label="MaxHits"   min={1} max={10} step={1} marks={[1,5,10]} callback={callFromChild} />}/>
        </Row>
        <Row>
          <Col span={12} children={<RangedCollapse dbName="metaMinTurns" label="MinTurns"  min={1} max={20} step={1} marks={[1,10,20]}  callback={callFromChild}/>}/>
          <Col span={12} children={<RangedCollapse dbName="metaMaxTurns" label="MaxTurns" min={1} max={20} step={1} marks={[1,10,20]}  callback={callFromChild} />}/>
        </Row>
  
        <Row>
          <Col span={8} children={<RangedCollapse dbName="metaHealing" label="Healing" min={0} max={100} marks={[0,50,100]} callback={callFromChild} />}/>
          <Col span={8} children={<RangedCollapse dbName="metaDrain" label="Drain"  min={0} max={100} marks={[0,50,100]} callback={callFromChild}/>}/>
          <Col span={8} children={<RangedCollapse dbName="metaDrain" label="Recoil" min={0} max={100} marks={[0,50,100]} callback={callFromChild} 
                intermidateFunction={(value:number[])=>value.map((item)=>item*-1).sort((a,b)=>a-b)}
              />}
          />
        </Row>
        <Row>
        </Row>

        <Row>
          <Col span={12} children={<SelectMultiCheck dbName="metaAilment" label="Ailment"  callback={callFromChild} urlSource={`${process.env.REACT_APP_API_URL}/moves/getAilments`}/>}/>
          <Col span={12} children={<RangedCollapse dbName="metaAilmentChance" label="AilmentChance" min={0} max={100} marks={[0,50,100]}callback={callFromChild}  />}/>
        </Row>
        <Row>
        <Col span={12} children={<RangedCollapse dbName="metaFlinchChance" label="FlinchChance" min={0} max={100} marks={[0,50,100]} callback={callFromChild} />}/>
          <Col span={12} children={<RangedCollapse dbName="metaStatChance" label="StatChance" min={0} max={100} marks={[0,50,100]} callback={callFromChild} />}/>
        </Row>
  </>
    )
  }