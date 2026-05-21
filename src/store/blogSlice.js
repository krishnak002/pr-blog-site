import { createSlice } from '@reduxjs/toolkit'

const sampleBlogs = [
  {
    id: 1,
    title: 'Getting Started With React',
    content:
      'React is a JavaScript library for building user interfaces. It helps create reusable UI components.',
    excerpt:
      'React is a JavaScript library for building user interfaces...',
    author: 'Admin',
    authorId: 1,
    date: new Date().toLocaleDateString(),
    category: 'React',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Learn Redux Toolkit',
    content:
      'Redux Toolkit simplifies Redux development and reduces boilerplate code.',
    excerpt:
      'Redux Toolkit simplifies Redux development...',
    author: 'Admin',
    authorId: 1,
    date: new Date().toLocaleDateString(),
    category: 'Redux',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    readTime: '4 min',
  },
  {
    id: 3,
    title: 'Why Use Vite?',
    content:
      'Vite provides faster development server and better build performance for modern React apps.',
    excerpt:
      'Vite provides faster development server...',
    author: 'Admin',
    authorId: 1,
    date: new Date().toLocaleDateString(),
    category: 'Vite',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    readTime: '3 min',
  },
]

const savedBlogs =
  JSON.parse(localStorage.getItem('blogs')) ||
  sampleBlogs

localStorage.setItem(
  'blogs',
  JSON.stringify(savedBlogs)
)

const initialState = {
  blogs: savedBlogs,
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog: (state, action) => {
      const blog = {
        ...action.payload,
        id: Date.now(),
        excerpt: action.payload.content.slice(0, 120),
        date: new Date().toLocaleDateString(),
      }

      state.blogs.unshift(blog)

      localStorage.setItem(
        'blogs',
        JSON.stringify(state.blogs)
      )
    },

    updateBlog: (state, action) => {
      const index = state.blogs.findIndex(
        (blog) => blog.id == action.payload.id
      )

      if (index !== -1) {
        state.blogs[index] = {
          ...state.blogs[index],
          ...action.payload,
          excerpt: action.payload.content.slice(0, 120),
        }

        localStorage.setItem(
          'blogs',
          JSON.stringify(state.blogs)
        )
      }
    },

    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter(
        (blog) => blog.id != action.payload
      )

      localStorage.setItem(
        'blogs',
        JSON.stringify(state.blogs)
      )
    },
  },
})

export const {
  addBlog,
  updateBlog,
  deleteBlog,
} = blogSlice.actions

export default blogSlice.reducer