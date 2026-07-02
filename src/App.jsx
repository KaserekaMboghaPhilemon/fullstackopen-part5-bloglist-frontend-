// src/App.jsx
//
// Main application component for the Part 5 Blog List frontend.
// This component handles user authentication and initializes the app.

import { useState } from 'react'
import loginService from './services/login'
import './App.css'

function App() {
  // State for login form inputs
  // These hooks store the username and password entered by the user
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // State for logged-in user information
  // When login succeeds, this will contain { username, name, token }
  const [user, setUser] = useState(null)

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
        <h1>Blog List - Part 5</h1>
        <h2>Login</h2>

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
      <h1>Blog List - Part 5</h1>

      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#e8f5e9' }}>
        <p>Welcome, <strong>{user.name}</strong>!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>Blogs</h2>
      <p>Blog list component will be added here in future exercises.</p>
    </div>
  )
}

export default App
