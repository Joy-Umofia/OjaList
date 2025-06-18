

import { useState } from 'react'
import './App.css'


// const allList=[
//   {id:1,description:"carrots",budget:300,price:400,packed:false},
//   {id:2,description:"bread",budget:300,price:400,packed:false},
//   {id:3,description:"beans",budget:300,price:400,packed:true},
//   {id:4,description:"rice",budget:300,price:400,packed:false}
// ]

function App() {
  const[items,setItems]=useState([])
  return(
    <div>
      <Logo />
      <Budget />
      <Item addItems={items} upDateItems={setItems}/>
      
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

function Item({addItems,upDateItems}){
  const[description,setDescription]=useState("")
  const[price,setPrice]=useState("")
  
  
  
 function handleSubmit(e){
     e.preventDefault()
     if(!description)alert("Please input an item")
    const newItem={
    id:Date.now(),
    description:description,
    price:Number(price),
    packed:false,
  }
   upDateItems([...addItems,newItem])

      setDescription("")
      setPrice("")
  }
  return(
    <div className='item-section'>
      <form className='items-form' onSubmit={handleSubmit}>
        <label htmlFor="">Add item</label>
        <div className="items-input">
          <input type="text" placeholder='item description' value={description}onChange={(e)=>setDescription(e.target.value)}/>
          <input type="number" placeholder='price' value={price} onChange={(e)=>setPrice(e.target.value)}/>
          <button> + Add Item</button>
        </div>
      </form>
      <CardSection addItems={addItems} upDateItems={upDateItems}/>
      <Statistics />
    </div>
  )
}

function CardSection({addItems}){
  return(
    <div className='items'>
      {addItems.map((item)=><Cards item={item} key={item.id} />)}
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
