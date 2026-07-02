// src/services/blogs.js
//
// This file handles all blog-related API requests using Axios.
// It provides functions to fetch, create, update, and delete blogs.

import axios from 'axios'

// Create an axios instance for making HTTP requests to the backend
// The /api prefix will be forwarded to http://localhost:3003 by Vite's proxy
const api = axios.create()

/**
 * Sets the authorization token in the request headers for authenticated requests.
 * This token is sent with every API request to authenticate the user.
 *
 * @param {string} token - The JWT token from login response
 */
const setToken = (token) => {
  // Add the token to the default headers of all future requests
  // The Authorization header follows the "Bearer <token>" format
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

/**
 * Fetches all blogs from the backend.
 * This is called after user logs in to display the list of blogs.
 *
 * @returns {Promise} A promise that resolves with an array of blog objects
 *
 * Example response:
 *   [
 *     { id: '...', title: 'React patterns', author: 'Michael Chan', url: '...', likes: 0 },
 *     { id: '...', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', ... }
 *   ]
 */
const getAll = async () => {
  try {
    // Send a GET request to fetch all blogs
    const response = await api.get('/api/blogs')
    return response.data
  } catch (error) {
    console.error('Error fetching blogs:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Creates a new blog on the backend.
 * Requires the user to be logged in (authorization token needed).
 *
 * @param {object} blogData - The blog object with title, author, url, and likes
 * @returns {Promise} A promise that resolves with the created blog (including its ID)
 *
 * Example usage:
 *   const newBlog = await blogService.create({
 *     title: 'New React Tips',
 *     author: 'Jane Doe',
 *     url: 'https://example.com',
 *     likes: 0
 *   })
 */
const create = async (blogData) => {
  try {
    // Send a POST request to create a new blog
    // The Authorization header with token is automatically included
    const response = await api.post('/api/blogs', blogData)
    return response.data
  } catch (error) {
    console.error('Error creating blog:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Updates an existing blog on the backend.
 * Typically used to update the likes count or other blog properties.
 *
 * @param {string} id - The ID of the blog to update
 * @param {object} updatedBlog - The updated blog object
 * @returns {Promise} A promise that resolves with the updated blog
 */
const update = async (id, updatedBlog) => {
  try {
    const response = await api.put(`/api/blogs/${id}`, updatedBlog)
    return response.data
  } catch (error) {
    console.error('Error updating blog:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Deletes a blog from the backend.
 * Only the blog's creator can delete it.
 *
 * @param {string} id - The ID of the blog to delete
 * @returns {Promise} A promise that resolves when the blog is deleted
 */
const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/api/blogs/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting blog:', error.response?.data || error.message)
    throw error
  }
}

// Export the service object with all available blog operations
export default {
  getAll,
  create,
  update,
  deleteBlog,
  setToken,
}
