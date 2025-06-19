

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
   const[description,setDescription]=useState("")
  const[price,setPrice]=useState("")
  const[editId,setEditId]=useState(null)

  // deleting items
  function handleDeleteItems(id){
    setItems(items=>items.filter((item)=>item.id !==id))
  }
  // editing the items
  function editItems(id) {
    console.log("edit icon clicked")
  const itemToEdit = items.find(item => item.id === id);
  if (itemToEdit) {
    setDescription(itemToEdit.description);
    setPrice(itemToEdit.price.toString());
    setEditId(id)
  }
 }
  function toggle(id){
     setItems(items.map(item=>item.id===id?{...items,packed:item.packed}:item))
  }
  return(
    <div>
      <Logo />
      <Budget />
      <Item addItems={items} upDateItems={setItems}
      deleteItems={handleDeleteItems} description={description} setDescription={setDescription} price={price} setPrice={setPrice} editItems={editItems} editId={editId}
      setEditId={setEditId} toggle={toggle}/>
      
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

function Item({addItems,upDateItems,deleteItems,description,setDescription,price,setPrice,editItems,editId,setEditId,toggle}){
  // const[description,setDescription]=useState("")
  // const[price,setPrice]=useState("")
  
  
  
 function handleSubmit(e){
     e.preventDefault()
     if(!description) {
      alert("You forgot to input an item")
      return
     }
    if(!price) {
      alert("Input your price so you dont't over spend")
      return
    }
     if (editId !== null) {
    
    const updatedItems = addItems.map(item =>
      item.id === editId
        ? { ...item, description, price: Number(price) }
        : item
    );
    upDateItems(updatedItems);
    setEditId(null); 
  } else {
    
    const newItem = {
      id: Date.now(),
      description,
      price: Number(price),
      packed: false,
    };
    upDateItems([...addItems, newItem]);
  }
    
  //   const newItem={
  //   id:Date.now(),
  //   description:description,
  //   price:Number(price),
  //   packed:false,
  // }
  //  upDateItems([...addItems,newItem])

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
          <button>{editId !== null ? " Update" : "+ Add Item"}</button>
        </div>
      </form>
      <CardSection addItems={addItems} upDateItems={upDateItems} deleteItems={deleteItems} editItems={editItems} editId={editId} toggle={toggle}/>
      <Statistics />
    </div>
  )
}

function CardSection({addItems,deleteItems,editItems,toggle}){
  return(
    <div className='items'>
      {addItems.map((item)=><Cards item={item} key={item.id} deleteItems={deleteItems} editItems={editItems}/>)}
    </div>
  )
}

function Cards({item,deleteItems,editItems}){
   return(
    <div className='items-card'>
        <div>
          <input type="checkbox" value={toggle.packed} onChange={()=>toggle(item.packed)} id="" />
          <p style={item.packed?{textDecoration:"line-through"}:{}}>{item.description}</p>
        </div>
        <div>
          <p>{`₦${item.price}`}</p>
          <span style={{cursor:"pointer"}} onClick={()=>deleteItems(item.id)} title="delete">🗑️</span>
          <span style={{cursor:"pointer"}} onClick={()=>editItems(item.id)} title="edit">✏️</span>
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
