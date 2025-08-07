import React from 'react'
import { useContext } from 'react'
import { ExpenseContext } from './Context/ExpenseContext'
import { useEffect } from 'react'
import { List, Progress, Tag ,Flex} from "antd";
import { ThemeContext } from './Context/ThemeContext';
const CategorywiseExpense = () => {
  const {theme}=useContext(ThemeContext)
 const {categoryExpense,userCategoryExpense}=useContext(ExpenseContext)
 const total=categoryExpense.reduce((sum,item)=>sum+item.totalSpent,0)
 useEffect(()=>{
   userCategoryExpense()
 },[])
  return (
    <div className={`${theme==="dark"?"dark-list":""}`}>
      <List
      size='large'
      header={<h4>Spending by Category</h4>}
      pagination={{
        pageSize:4,
        position:'bottom',
        align:'start'
      }}
      itemLayout='horizontal'
      dataSource={categoryExpense}
      renderItem={(item)=>{
        const percent=((item.totalSpent/total)*100).toFixed(1)
        return(
          <List.Item> 
            <List.Item.Meta
            title={<Tag color="geekblue">{item._id.toUpperCase()}</Tag>}
            description={
              <>
             
            <div >
              <span> ₹{item.totalSpent} spent</span>
              <Progress  percent={Number(percent)} size="small" status='active'strokeColor={{ from: '#108ee9', to: '#87d068' }}/>
              </div>
              </>
            }
            />
          </List.Item>

        )
      }}
      
      />
    </div>
  )
}

export default CategorywiseExpense
