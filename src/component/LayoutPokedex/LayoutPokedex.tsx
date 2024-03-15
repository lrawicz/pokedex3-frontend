import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, List, Menu, Row, Select, theme } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { DefaultOptionType } from 'antd/es/select';
import Flex from 'antd/es/flex'
import Tabs from 'antd/es/tabs'
import { STATS } from '../STATS/STATS';
import { Moves } from '../Moves/Moves';
import { Abilities } from '../Abilities/Abitlies';
import './LayoutPokedex.css'

const { Header, Content, Sider } = Layout;
// load css file

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const LayoutPokedex: React.FC = () => {
  let [filterData,setFilterData] = useState({})

  let [generation,setGeneration] = useState(9)
  let [pokemons,setPokemons] = useState([])

  const sendToParent = (key:string,value:any) => {
    console.log(key, value)
    let tmp  = {...filterData, [key]: value}
    setFilterData(tmp)
  }
  let updatePokemons = async()=>{
    let url = `${process.env.REACT_APP_API_URL}/pokemons`
    url += "?filter=" + JSON.stringify(filterData)
    fetch(url).then(res => res.json()).then(data => {
      setPokemons(data)
    })
  }
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {updatePokemons()}, [filterData])

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ flex: 1, minWidth: 0 }}
        >
          
          <Flex justify='flex-end' style={{width:"100%" }}>

          <Select  style={{ width: 150 }}
            //value={{title: `generation ${generation}`, value: {generation}}}
            onChange={(value,item) => {setGeneration(value)}}
            options={Array.from({length: 9}, (x, i) => i).map((key) => ({
                key:`${key+1}`, value: `${key+1}`, label: `generation ${key+1}`
              }))
            }
          />
          </Flex>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>

        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>pokedex</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
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
                {key: 'pokemon', label: 'pokemon'},
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
          <List >
            {pokemons.map((pokemon:any) => 
            <List.Item className='poke-item-list' style={{background:"white",height:"100%"}} key={pokemon.id}>
              <Flex justify='flex-end' style={{position:"absolute",width:"100%"}}>
                <div style={{paddingRight:"15px"}}>{ pokemon.id}  </div>
              </Flex>
              <Row>
                <img  className='poke-img' src={`./sprites2/${pokemon.name}.png`}/>              
                <Flex className='poke-name' align='flex-end'>
                  {pokemon.name.slice(0)[0].toUpperCase()+pokemon.name.slice(1)}
                </Flex>
              </Row>
              </List.Item>)}
          </List>
        </Sider>
      </Layout>
    </Layout>
  );
};
//

export default LayoutPokedex;