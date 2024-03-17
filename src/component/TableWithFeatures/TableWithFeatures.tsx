import { Flex, Input, Row, Slider, Table } from "antd"
import type { SliderSingleProps } from 'antd';
import { RangedCollapse } from "../inputs/RangedCollapse/RangedCollapse";
import { useEffect, useState } from "react";
type params = {
    originalData:any,
    callback:any
    columns:any
}

export const TableWithFeatures: React.FC<params> = ({originalData,columns=[],callback}) => {

    let [nameSearch,setNameSearch] = useState('')
    let [listByName,setListByName] = useState([])
    let [selectedItems,setSelectedItems] = useState([])


    useEffect(()=>{
      callback(selectedItems);
      seachByName("")
      },
      [listByName,originalData]
    )
      
    function seachByName(value:any,listItems:any =[]){ 
        setNameSearch(value)
        if(listItems.length == 0){
          setListByName(originalData);
        }else{
          listItems = listItems?listItems:[...originalData]
          let tmp = listItems.filter((entry:any) =>entry.name.includes(value))
          setListByName(tmp);
        }
      }
      

    let FilterByNameInput = (
        <Input
          placeholder="Name"
          value={nameSearch}
          onChange={e => {seachByName(e.target.value)}}
        />
      );
    let titleColumn = {title:FilterByNameInput, dataIndex:"name", key:"name", width:"200px"}
            
    columns = [titleColumn,...columns]
    return(
        <>
          <Table  columns={columns} 
          rowKey={"id"}
          dataSource={listByName.length ? listByName : originalData}
          scroll={{ x: 2000, y: 500 }}

          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selectedItems,
            onSelect: (record:any, selected:any, selectedRows:any, nativeEvent:any) => {
              let selectedRowKeys = selectedRows.map((row:any) => row.id);
              callback(selectedRowKeys);
              setSelectedItems(selectedRowKeys)
            }, 
            onSelectAll: (selectedBool:Boolean, selectedRows:any, changeRows:any) => {
              let selected:any =  selectedBool? originalData.map((row:any) => row.id): []
              if(selectedBool){
                console.log(listByName)
                selected = listByName.length ? 
                          listByName.map((row:any) => row.id) :
                          originalData.map((row:any) => row.id);
              }else{
                  selected= []
              }
              callback(selected);
              setSelectedItems(selected)
            },
          }}
        />
        </>
    )
}