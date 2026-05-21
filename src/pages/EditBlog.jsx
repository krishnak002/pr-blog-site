import './EditBlog.css'

import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { updateBlog } from '../store/blogSlice'

const EditBlog = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { blogs } = useSelector(
    (state) => state.blogs
  )

  const { currentUser } = useSelector(
    (state) => state.auth
  )

  const blog = blogs.find(
    (blog) => blog.id == id
  )

  if (!currentUser) {
    navigate('/login')
  }

  if (blog.authorId !== currentUser.id) {
    navigate('/')
  }

  const [formData, setFormData] = useState({
    title: blog.title,
    category: blog.category,
    readTime: blog.readTime,
    image: blog.image,
    content: blog.content,
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
      updateBlog({
        id,
        ...formData,
      })
    )

    navigate(`/blog/${id}`)
  }

  return (
    <div className="edit-blog">
      <form
        className="blog-form"
        onSubmit={handleSubmit}
      >
        <h2>Edit Blog</h2>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="readTime"
          value={formData.readTime}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <textarea
          rows="10"
          name="content"
          value={formData.content}
          onChange={handleChange}
        ></textarea>

        <button type="submit">
          Update Blog
        </button>
      </form>
    </div>
  )
}

export default EditBlog