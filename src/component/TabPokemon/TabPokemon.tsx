import { Checkbox, Col, Row, Select } from "antd";
import { SelectMultiCheck } from "../inputs/SelectMultiCheck/SelectMultiCheck";
import { useState } from "react";

type params = {
    callback:any
  }
export const TabPokemon: React.FC<params> = ({callback}) => {

    let [data,setData] = useState({})
    let [monotype,setMonotype] = useState(false)
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
        callback("general",tmp)
    }
    return(
        
        <>
        Name:
        weight:
        height:
        <Col span={6} >
                <SelectMultiCheck 
                    dbName="colors" 
                    label="colors"  
                    callback={callFromChild} 
                    urlSource={`${process.env.REACT_APP_API_URL}/pokemon/colors`}  
                    />
            </Col>
        <Row >
            <Col span={6} >
                <SelectMultiCheck 
                    dbName="type01" 
                    label="type 01"  
                    callback={callFromChild} 
                    urlSource={`${process.env.REACT_APP_API_URL}/pokemon/types`}  
                />
            </Col>

            <Col span={6} >
                <SelectMultiCheck 
                    dbName="type02" 
                    label="type 02"
                    metaEnable={!monotype}
                    callback={callFromChild} 
                    urlSource={`${process.env.REACT_APP_API_URL}/pokemon/types`}  
                    />
            </Col>
            <Col>
            <Checkbox
              checked ={monotype} 
              onChange={(e)=>{
                setMonotype(e.target.checked);
                let tmp = {...data, "monotype": e.target.checked};
                setData( tmp);
                callback("general",tmp);

              }
                }>Monotype</Checkbox>
            </Col>
        </Row>
        <Row>
          <Col>
            isBaby <Select
              style={{width:"100px"}}
              disabled={true}

              options={[
                {label:"true",value:"true"},
                {label:"false",value:"false"},
                {label:"null",value:"null"},
                
              ]}
              />
          </Col>
          <Col>
            isLegendary <Select
              style={{width:"100px"}}
              disabled={true}

              options={[
                {label:"true",value:"true"},
                {label:"false",value:"false"},
                {label:"null",value:"null"},
                
              ]}
              />
          </Col>
          <Col>
            isMythical <Select
              disabled={true}
              style={{width:"100px"}}
              options={[
                {label:"true",value:"true"},
                {label:"false",value:"false"},
                {label:"null",value:"null"},
                
              ]}
              />
          </Col>
          
        </Row>
        </>
    );
}