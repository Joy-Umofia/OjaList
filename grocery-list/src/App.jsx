

import { useState } from 'react'
import './App.css'


const allList=[
  {id:1,description:"carrots",budget:300,price:400,packed:false},
  {id:2,description:"bread",budget:300,price:400,packed:false},
  {id:3,description:"beans",budget:300,price:400,packed:true},
  {id:4,description:"rice",budget:300,price:400,packed:false}
]

function App() {
  return(
    <div>
      <Logo />
      <Budget />
      <Item />
      
    </div>
  )
  
}

function Logo(){
  return(
    <div style={{paddingBottom:"20px"}}>
      <h1>🧺OJaList</h1>
      <p style={{color: '#555'}}>No more oversabi spending — just your market list and your money talking.</p>
    </div>
  )
}
function Budget(){
  return(
    <form className='budget-container'>
      <div className='in-cont'>
          <span style={{color:"green",fontSize:"1.2rem"}}>₦:</span>
          <input type="number"  placeholder='000' required/>
      </div>
      <button>Add budget</button>
    </form>
  
  )
}

function Item(){
  const[description,setDescription]=useState("value")

  function handleSubmit(e){
     e.preventDefault()
     if(!description)alert("hello")
  }
  return(
    <div className='item-section'>
      <form className='items-form' onSubmit={handleSubmit}>
        <label htmlFor="">Add item</label>
        <div className="items-input">
          <input type="text" placeholder='item description' value={description}/>
          <input type="number" placeholder='₦:price'/>
          <button> + Add Item</button>
        </div>
      </form>
      <CardSection />
      <Statistics />
    </div>
  )
}

function CardSection(){
  return(
    <div className='items'>
      {allList.map((item)=><Cards item={item} />)}
    </div>
  )
}

function Cards({item}){
   return(
    <div className='items-card'>
         <div>
          <input type="checkbox" name="" id="" />
          <p style={item.packed?{textDecoration:"line-through"}:{}}>{item.description}</p>
        </div>
        <div>
          <p>{`₦${item.price}`}</p>
          <span>🗑️</span>
        </div>
      </div>
   )
}


function Statistics(){
  return(
    <div>
      <div>
        <p>Spent:</p>
        <p>Remaining:</p>
      </div>
      <button>Clear All</button>
      <select name="" id="">
        <option value="">Name (a-z)</option>
        <option value="">Price(low-High)</option>
        <option value="">Bought</option>
      </select>
    </div>
  )
}

export default App
