import './Auth.css'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  register,
  clearError,
} from '../store/authSlice'

import { useNavigate } from 'react-router-dom'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error } = useSelector(
    (state) => state.auth
  )

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(clearError())

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setMessage('Passwords do not match')
      return
    }

    dispatch(register(formData))

    const users =
      JSON.parse(localStorage.getItem('users')) || []

    const user = users.find(
      (u) => u.email === formData.email
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
        <h2>Register</h2>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {message && (
          <div className="error">
            {message}
          </div>
        )}

        <label>Name</label>

        <input
          type="text"
          name="name"
          onChange={handleChange}
        />

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

        <label>Confirm Password</label>

        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
        />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  )
}

export default Register