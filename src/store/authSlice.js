import { createSlice } from '@reduxjs/toolkit'

const users = JSON.parse(localStorage.getItem('users')) || []
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null

const initialState = {
  users,
  currentUser,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      const { name, email, password } = action.payload

      const existingUser = state.users.find(
        (user) => user.email === email
      )

      if (existingUser) {
        state.error = 'User already exists'
        return
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
      }

      state.users.push(newUser)
      state.currentUser = newUser
      state.error = null

      localStorage.setItem('users', JSON.stringify(state.users))
      localStorage.setItem(
        'currentUser',
        JSON.stringify(newUser)
      )
    },

    login: (state, action) => {
      const { email, password } = action.payload

      const user = state.users.find(
        (user) =>
          user.email === email &&
          user.password === password
      )

      if (!user) {
        state.error = 'Invalid email or password'
        return
      }

      state.currentUser = user
      state.error = null

      localStorage.setItem(
        'currentUser',
        JSON.stringify(user)
      )
    },

    logout: (state) => {
      state.currentUser = null
      localStorage.removeItem('currentUser')
    },

    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  register,
  login,
  logout,
  clearError,
} = authSlice.actions

export default authSlice.reducer