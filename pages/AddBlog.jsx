import './AddBlog.css'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../../store/blogSlice'
import { useNavigate } from 'react-router-dom'

const AddBlog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { currentUser } = useSelector(
    (state) => state.auth
  )

  if (!currentUser) {
    navigate('/login')
  }

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    readTime: '',
    image: '',
    content: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(
      addBlog({
        ...formData,
        author: currentUser.name,
        authorId: currentUser.id,
      })
    )

    navigate('/')
  }

  return (
    <div className="add-blog">
      <form
        className="blog-form"
        onSubmit={handleSubmit}
      >
        <h2>Add Blog</h2>

        <input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Category"
          name="category"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Read Time"
          name="readTime"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Image URL"
          name="image"
          onChange={handleChange}
        />

        <textarea
          rows="10"
          placeholder="Content"
          name="content"
          onChange={handleChange}
        ></textarea>

        <button type="submit">
          Add Blog
        </button>
      </form>
    </div>
  )
}

export default AddBlog