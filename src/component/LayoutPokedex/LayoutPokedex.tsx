import React, { useEffect, useState } from 'react';
import {  Layout, Row, Select, Table, theme } from 'antd';
import Flex from 'antd/es/flex'
import Tabs from 'antd/es/tabs'
import { STATS } from '../STATS/STATS';
import { Moves } from '../Moves/Moves';
import { Abilities } from '../Abilities/Abitlies';
import './LayoutPokedex.css'
import Column from 'antd/es/table/Column';
import { TabPokemon } from '../TabPokemon/TabPokemon';

const { Header, Content, Sider } = Layout;

const LayoutPokedex: React.FC = () => {
  let [pagination,setPagination] = useState({limit:10000,offset:0})
  let [filterData,setFilterData] = useState({})

  let [generation,setGeneration] = useState(9)
  let [pokemons,setPokemons] = useState([])

  const sendToParent = (key:string,value:any) => {
    setFilterData({...filterData, [key]: value})
  }
  let updatePokemons = async()=>{
    let url = `${process.env.REACT_APP_API_URL}/pokemons?`
    let query = [`filter=${JSON.stringify(filterData)}`,`limit=${pagination.limit}`, `offset=${pagination.offset}`]
    url = url + query.join("&")
    fetch(url).then(res => res.json()).then(data => {
      setPokemons(data.result)
    })
  }
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {updatePokemons()}, [filterData,generation])

  return (
    <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <Flex justify='center' align='center' style={{width:"100%" }}>
            <p style={{color:"White"}}>Generation: </p> 
            <Select  style={{ width: 150 }}
              onChange={(value,item) => {setGeneration(value);sendToParent("generation",value)}}
              options={Array.from({length: 9}, (x, i) => i).map((key) => ({
                  key:`${key+1}`, value: `${key+1}`, label: `generation ${key+1}`
                }))
              }
            />
          </Flex>
        </Header>
      <Layout>

        <Layout style={{ padding: '0 24px 24px' }}>
        
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 600,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            
            <Tabs
              items={[
                {key: 'pokemon', label: 'pokemon', children: <TabPokemon callback={sendToParent}/>},
                {key: 'STATS', label: 'STATS', children: <STATS callback={sendToParent}/>},
                {key: 'moves', label: 'moves', children: <Moves callback={sendToParent}/>},
                {key: 'abilities', label: 'Abilities', children:  <Abilities callback={sendToParent} generation={generation}/>},
              ]}
            />

          </Content>
        </Layout>
        {/*
        //style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
        */
        }

        <Sider  
          trigger={null} 
          collapsible 
          width={250}
          collapsed={false} collapsedWidth={0} //TODO: fix this
          style={{overflow: 'auto',height:"90vh",  background:"grey"}} 
        >
          
          <Table dataSource={pokemons} showHeader={false}>;
            <Column  
                title={"pokemon"}  
                render= {(record:any,index:number|undefined)=>
                  <>
                  <Flex justify='center' style={{width:"100%"}}>
                    <Flex justify='flex-end' style={{position:"absolute",width:"100%"}}>
                    <div style={{paddingRight:"15px"}}>{ record.id}  </div>
                  </Flex>
                  <Row className='poke-row'>
                    <img  className='poke-img' src={`./sprites2/${record.name}.png`}/>              
                    <Flex className='poke-name' align='flex-end'>
                      {record.name.slice(0)[0].toUpperCase()+record.name.slice(1)}
                    </Flex>
                  </Row>
                  </Flex>
                  </>
                }
                />;
          </Table>

          
        </Sider>
      </Layout>
    </Layout>
  );
};
//

export default LayoutPokedex;