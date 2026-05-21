import './BlogCard.css'
import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog.id}`}
      className="blog-card"
    >
      <img src={blog.image} alt="" />

      <div className="blog-content">

        <span className="blog-category">
          {blog.category}
        </span>

        <h3>{blog.title}</h3>

        <p>{blog.excerpt}...</p>

        <div className="blog-footer">
          <div>
            <div className="author">
              {blog.author}
            </div>

            <div className="date">
              {blog.date} • {blog.readTime}
            </div>
          </div>
        </div>

      </div>
    </Link>
  )
}

export default BlogCard