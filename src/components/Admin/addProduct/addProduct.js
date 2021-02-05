import axios from 'axios'
import { connect } from 'react-redux'
import { useState } from 'react'
import './addProduct.css'

const AddProduct = (props) => {

  const { customer } = props.userReducer
  const [addView, setAddView] = useState(false)
  const [editView, setEditView] = useState(false)
  const [deleteView, setDeleteView] = useState(false)
  const [adminInput, setAdminInput] = useState({
    name: '',
    category: '',
    sku: '',
    price: '',
    img: ''

  })

  const handleInput = e => {
    setAdminInput({ ...adminInput, [e.target.name]: e.target.value })
  }

  const clearInput = () => {
    setAdminInput({
      name: '',
      category: '',
      sku: '',
      price: '',
      img: ''
    })
  }

  const handleAddView = () => {
    setEditView(false)
    setDeleteView(false)
    setAddView(!addView)
  }

  const handleEditView = () => {
    setAddView(false)
    setDeleteView(false)
    setEditView(!editView)
  }

  const handleDeleteView = () => {
    setEditView(false)
    setAddView(false)
    setDeleteView(!deleteView)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    axios.post('/api/product', adminInput)
      .then(() => {
        clearInput()
      })
      .catch(err => console.log(err))
  }

  const handleEdit = (e) => {
    e.preventDefault()
    axios.put('/api/product', adminInput)
      .then(() => { clearInput() })
      .catch(err => console.log(err))
  }

  const handleDelete = (e) => {
    e.preventDefault()
    axios.delete('/api/product', adminInput.sku)
      .then(() => { clearInput() })
      .catch(err => console.log(err))
  }

  return (

    <div>
      {
        (customer && customer.isadmin === true) ? (
          <div>
            <div className='admin-buttons'>
              <button className='button' onClick={handleAddView}>Add Product</button>
              <button className='button' onClick={handleEditView} >Edit Product</button>
              <button className='button' onClick={handleDeleteView} >Delete Product</button>
            </div>
            {addView === true ? (
              <form className='input-form' onSubmit={(e) => handleAdd(e)}>

                <input className='input' placeholder='Product Name' name='name' value={adminInput.name} onChange={handleInput} />

                <input className='input' placeholder='Product Category' name='category' value={adminInput.category} onChange={handleInput} />
                <input className='input' placeholder='SKU' name='sku' value={adminInput.sku} onChange={handleInput} />
                <input className='input' placeholder='Price' name='price' value={adminInput.price} onChange={handleInput} />
                <input className='input' placeholder='Image Url' name='img' value={adminInput.img} onChange={handleInput} />
                <button className='button' onClick={handleAdd}>Add</button>
              </form>
            ) : (editView === true ? (
              <form className='input-form' onSubmit={(e) => handleEdit(e)}>
                <p>Enter sku of product you want to edit</p>
                <input className='input' placeholder='SKU' name='sku' value={adminInput.sku} onChange={handleInput} />
                <p>Product Info </p>
                <input className='input' placeholder='Product Name' name='name' value={adminInput.name} onChange={handleInput} />
                <input className='input' placeholder='Product Category' name='category' value={adminInput.category} onChange={handleInput} />
                <input className='input' placeholder='Price' name='price' value={adminInput.price} onChange={handleInput} />
                <input className='input' placeholder='Image Url' name='img' value={adminInput.img} onChange={handleInput} />
                <button className='button' onClick={handleEdit}>Edit</button>
              </form>
            ) : (deleteView === true ? (
              <form className='input-form' onSubmit={(e) => handleDelete(e)}>
                <p>Enter sku of product you want to remove</p>
                <input className='input' placeholder='SKU' name='sku' value={adminInput.sku} onChange={handleInput} />
                <button className='button' onClick={handleDelete}>Delete</button>
              </form>
            ) : null))}
          </div >
        ) : (props.history.push('/auth/login'))}
    </div >
  )
}
const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {})(AddProduct)