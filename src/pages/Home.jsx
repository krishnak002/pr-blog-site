import './Home.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import BlogCard from '../components/BlogCard'

const Home = () => {
  const { blogs } = useSelector(
    (state) => state.blogs
  )

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const categories = [
    'All',
    ...new Set(blogs.map((blog) => blog.category)),
  ]

  const filteredBlogs = blogs.filter((blog) => {
    const matchSearch = blog.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchCategory =
      category === 'All' ||
      blog.category === category

    return matchSearch && matchCategory
  })

  return (
    <div className="home">
      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="search-input"
      />

      <div className="categories">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="blog-grid">
        {filteredBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </div>
  )
}

export default Home