import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'

const Navbar = () => {
  const { currentUser } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        BlogApp
      </Link>

      <div className="nav-links">
        {currentUser && (
          <Link to="/add-blog" className="add-btn">
            +
          </Link>
        )}

        {!currentUser ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span>{currentUser.name}</span>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar