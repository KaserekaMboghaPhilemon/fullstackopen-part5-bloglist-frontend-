// src/services/login.js
//
// This file handles all login-related API requests using Axios.
// It provides a clean interface for the frontend to communicate with the backend.

import axios from 'axios'

// Create an axios instance for making HTTP requests
// The /api prefix will be forwarded to http://localhost:3003 by Vite's proxy
const api = axios.create()

/**
 * Attempts to log in a user by sending their credentials to the backend.
 *
 * @param {string} username - The user's username or email
 * @param {string} password - The user's password
 * @returns {Promise} A promise that resolves with the user data and token from the backend
 *
 * Example usage:
 *   const userData = await loginService.login('user@example.com', 'password123')
 *   // userData will contain { username, name, token }
 */
const login = async (username, password) => {
  try {
    // Send a POST request to the backend's login endpoint
    // The /api prefix will be forwarded to http://localhost:3003/api by Vite's proxy
    const response = await api.post('/api/login', {
      username,
      password,
    })

    // Return the response data (should contain user info and auth token)
    return response.data
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Login failed:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Logs out the user by clearing their session from the backend (optional).
 * In most cases, you'll just clear the token from localStorage on the frontend.
 */
const logout = () => {
  // Clear stored token when user logs out
  localStorage.removeItem('bloglistToken')
}

// Export the service object with all available login operations
export default {
  login,
  logout,
}
