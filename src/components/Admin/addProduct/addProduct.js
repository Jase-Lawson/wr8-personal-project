import axios from 'axios'
import { connect } from 'react-redux'
import { useState } from 'react'
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import './addProduct.css'

const AddProduct = (props) => {

  const { customer } = props.userReducer
  const [addProductView, setAddProductView] = useState(false)
  const [addImageView, setAddImageView] = useState(false)
  const [editView, setEditView] = useState(false)
  const [deleteView, setDeleteView] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [url, setUrl] = useState('http://via.placeholder.com/450x450')
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

  const handleAddProductView = () => {
    setEditView(false)
    setDeleteView(false)
    setAddImageView(false)
    setAddProductView(!addProductView)
  }

  const handleEditView = () => {
    setAddProductView(false)
    setAddImageView(false)
    setDeleteView(false)
    setEditView(!editView)
  }

  const handleDeleteView = () => {
    setEditView(false)
    setAddImageView(false)
    setAddProductView(false)
    setDeleteView(!deleteView)
  }

  const handleAddImageView = () => {
    setEditView(false)
    setAddProductView(false)
    setDeleteView(false)
    setAddImageView(!addImageView)
  }

  const handleAddProduct = (e) => {
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
    axios.delete(`/api/product/${adminInput.sku}`)
      .then(() => { clearInput() })
      .catch(err => console.log(err))
  }

  const handleAddImage = (e) => {
    e.preventDefault()
    axios.post('/api/product_image', { sku: adminInput.sku, url })
      .then(() => { clearInput() })
      .catch(err => console.log(err))
  }

  const getSignedRequest = ([file]) => {
    setIsUploading({ isUploading: true })
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios
      .get('/api/signs3', {
        params: {
          'file-name': fileName,
          'file-type': file.type,
        },
      })
      .then(res => {
        const { signedRequest, url } = res.data;
        uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then(res => {
        setIsUploading(false);
        // console.log('axios', res, url)
        setUrl(url)
        // axios.post(`/api/product_image/${product_id}`)
        //   .then(res => {
        //     addImage(res.data)
        //   })
        //   .catch(err => console.log(err))
      })
      .catch(err => {
        setIsUploading({
          isUploading: false,
        });
        if (err.res.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  }

  console.log('props', props)
  return (

    <div>
      {
        (customer && customer.isadmin === true) ? (
          <div>
            <div className='admin-buttons'>
              <button className='button' onClick={handleAddProductView}>Add Product</button>
              <button className='button' onClick={handleEditView} >Edit Product</button>
              <button className='button' onClick={handleDeleteView} >Delete Product</button>
              <button className='button' onClick={handleAddImageView} >Add Product Image</button>
            </div>
            {addProductView === true ? (
              <form className='input-form' onSubmit={(e) => handleAddProduct(e)}>

                <input className='input' placeholder='Product Name' name='name' value={adminInput.name} onChange={handleInput} />

                <input className='input' placeholder='Product Category' name='category' value={adminInput.category} onChange={handleInput} />
                <input className='input' placeholder='SKU' name='sku' value={adminInput.sku} onChange={handleInput} />
                <input className='input' placeholder='Price' name='price' value={adminInput.price} onChange={handleInput} />
                <input className='input' placeholder='Image Url' name='img' value={adminInput.img} onChange={handleInput} />
                <button className='button' onClick={handleAddProduct}>Add</button>
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
            ) : (addImageView === true ? (
              <form className='input-form' onSubmit={(e) => handleAddImage(e)}>
                <p>Drop image file below and enter product Sku to add new images.</p>
                <input className='input' placeholder='SKU' name='sku' value={adminInput.sku} onChange={handleInput} />
                <input className='input' placeholder='Image URL' name='imageUrl' value={url} />
                <button className='button' onClick={handleAddImage}>Add Image</button>

                <h1>Upload</h1>
                {/* <h1>{url}</h1> */}
                <img src={url} alt="" width="250px" />

                <Dropzone
                  onDropAccepted={getSignedRequest}
                  accept="image/*"
                  multiple={false}>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      style={{
                        position: 'relative',
                        width: 160,
                        height: 80,
                        borderWidth: 5,
                        marginTop: 25,
                        borderColor: 'gray',
                        borderStyle: 'dashed',
                        borderRadius: 5,
                        display: 'inline-block',
                        fontSize: 17,
                      }}
                      {...getRootProps()}>
                      <input {...getInputProps()} />
                      {isUploading ? <GridLoader /> : <p>Drop files here, or click to select files</p>}
                    </div>
                  )}
                </Dropzone>
              </form>
            ) : null)))}
          </div >
        ) : (props.history.push('/auth/login'))}
    </div >
  )
}
const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {})(AddProduct)