// src/App.jsx
//
// Main application component for the Part 5 Blog List frontend.
// This component handles user authentication, blog fetching, and displays the blog list.

import { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import './App.css'

function App() {
  // State for login form inputs
  // These hooks store the username and password entered by the user
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // State for logged-in user information
  // When login succeeds, this will contain { username, name, token }
  const [user, setUser] = useState(null)

  // State for storing the list of blogs fetched from the backend
  // Initialized as an empty array, will be populated after login
  const [blogs, setBlogs] = useState([])

  /**
   * useEffect hook that runs after the component mounts or when user changes.
   * If a user is logged in, it fetches all blogs from the backend.
   * This ensures the blog list is refreshed whenever the user logs in.
   */
  useEffect(() => {
    // Only fetch blogs if a user is logged in
    if (user) {
      // Fetch all blogs from the backend
      blogService.getAll().then((blogsData) => {
        // Update the blogs state with the fetched data
        setBlogs(blogsData)
        console.log('Blogs fetched successfully:', blogsData)
      })
    }
  }, [user]) // This effect depends on the user state - runs when user changes

  /**
   * Handles the login form submission.
   * Sends credentials to the backend via the login service.
   * If successful, stores user data in state and localStorage.
   */
  const handleLogin = async (event) => {
    // Prevent default form submission behavior (page reload)
    event.preventDefault()

    try {
      // Attempt to log in using the provided credentials
      const userData = await loginService.login(username, password)

      // Clear the form inputs after successful login
      setUsername('')
      setPassword('')

      // Store the user data (including authentication token) in state
      setUser(userData)

      // Set the authorization token in the blogs service
      // This ensures all blog API requests include the token in the Authorization header
      blogService.setToken(userData.token)

      // Also store the token in localStorage so the user stays logged in after page refresh
      // The token will be sent with future API requests to authenticate the user
      localStorage.setItem('bloglistToken', userData.token)

      console.log('Login successful:', userData)
    } catch (error) {
      // If login fails, inform the user
      console.error('Login error:', error)
      alert('Invalid username or password')
    }
  }

  /**
   * Handles user logout.
   * Clears user data from state and localStorage.
   */
  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('bloglistToken')
    console.log('User logged out')
  }

  // If user is not logged in, show the login form
  if (!user) {
    return (
      <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
        <h2>Log in to application</h2>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  // If user is logged in, show the main app content
  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#e8f5e9' }}>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>blogs</h2>

      {/* Display blogs if any exist, otherwise show a message */}
      {blogs.length > 0 ? (
        <div>
          {/* Map through each blog and render it using the Blog component */}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <p>No blogs available yet.</p>
      )}
    </div>
  )
}

export default App
