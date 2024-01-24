import React from 'react'

const Tab = ({field, setField}) => {
  const tab = [
    {
      name : "Customer",
    },
    {
      name : "Seller"
    }
  ]

  const currentTab = [
    {
      background : "linear-gradient(90deg,#8d49f7,#6b53ff)",
      color : "white",
    },
    {
      backgroundColor : "white",
      color : "#2A2C37",
    }
  ]
  
  return (
    <div className='tab-box'>
      {
        tab.map((btn, index) => {
          return <div 
          style={field === btn.name ? (currentTab[0]) : (currentTab[1])}
          key={index}
          className='tab'
          onClick={ () => setField(btn.name)}>{btn.name}
          </div>
        })
      }
    </div>
  )
}

export default Tab
