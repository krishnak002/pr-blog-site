import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddBlog from './pages/AddBlog'
import EditBlog from './pages/EditBlog'
import BlogDetail from './pages/BlogDetail'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </>
  )
}

export default App