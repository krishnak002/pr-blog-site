import './Auth.css'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  login,
  clearError,
} from '../../store/authSlice'

import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error } = useSelector(
    (state) => state.auth
  )

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(clearError())

    dispatch(login(formData))

    const users =
      JSON.parse(localStorage.getItem('users')) || []

    const user = users.find(
      (u) =>
        u.email === formData.email &&
        u.password === formData.password
    )

    if (user) {
      navigate('/')
    }
  }

  return (
    <div className="auth-container">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <h2>Login</h2>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <label>Email</label>

        <input
          type="email"
          name="email"
          onChange={handleChange}
        />

        <label>Password</label>

        <input
          type="password"
          name="password"
          onChange={handleChange}
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login