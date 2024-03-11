import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, List, Menu, Select, theme } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { DefaultOptionType } from 'antd/es/select';
import Flex from 'antd/es/flex'
import Tabs from 'antd/es/tabs'
import { STATS } from '../STATS/STATS';
import { Moves } from '../Moves/Moves';
import { Abilities } from '../Abilities/Abitlies';

const { Header, Content, Sider } = Layout;



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
  let [generation,setGeneration] = useState(9)
  let [abilities, setAbilities] = useState([])
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
              {key: 'STATS', label: 'STATS', children: <STATS/>},
              {key: 'moves', label: 'moves', children: <Moves/>},
              {key: 'Abilities', label: 'Abilities', children: <Abilities abilities={abilities} setAbilities={setAbilities}/>},
            ]}
            />

          </Content>
        </Layout>
        {/*
        //style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
        */
        }

        <Sider  
        trigger={null} style={{overflow: 'auto',height:"90vh", background:"grey"}}collapsible collapsed={true}>
          <List>
            
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 3</List.Item>
            <List.Item>item 1</List.Item>
            <List.Item>item 2</List.Item>
            <List.Item>item 100</List.Item>
          </List>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default LayoutPokedex;