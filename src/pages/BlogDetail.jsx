import './BlogDetail.css'

import {
  useParams,
  Link,
  useNavigate,
} from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

const BlogDetail = () => {
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

  const handleDelete = () => {
    dispatch(deleteBlog(id))
    navigate('/')
  }

  return (
    <div className="blog-detail">
      <img
        src={blog.image}
        alt=""
      />

      <h1>{blog.title}</h1>

      <div className="detail-info">
        <span>{blog.author}</span>
        <span>{blog.category}</span>
        <span>{blog.date}</span>
      </div>

      <p>{blog.content}</p>

      {currentUser &&
        currentUser.id === blog.authorId && (
          <div className="actions">
            <Link to={`/edit-blog/${blog.id}`}>
              Edit
            </Link>

            <button onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
    </div>
  )
}

export default BlogDetail