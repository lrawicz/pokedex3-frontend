import {  Input, Table } from "antd"
import { useEffect, useState } from "react";
type params = {
    originalData:any,
    callback:any
    columns:any
    scroll?:any
}

export const TableWithFeatures: React.FC<params> = ({originalData,columns=[],callback,scroll={x:2000,y:500}}) => {

    let [nameSearch,setNameSearch] = useState('')
    let [listByName,setListByName] = useState([])
    let [selectedItems,setSelectedItems] = useState([])


    useEffect(()=>{
      setSelectedItems(originalData.map((row:any) => row.id))
      seachByName("")
      if(originalData.length == 0){
        callback(["NULL"])
      }else{
        callback(originalData.map((row:any) => row.id));
      }
      },
      [originalData]
    )
      
    function seachByName(value:any,listItems:any =[]){ 
        setNameSearch(value)
        if(value ==""){
          setListByName(originalData);
        }else{
          setListByName(
            originalData.filter((entry:any) =>entry.name.includes(value))
          );
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
          scroll={scroll}

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