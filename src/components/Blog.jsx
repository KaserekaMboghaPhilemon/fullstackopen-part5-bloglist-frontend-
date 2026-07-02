// src/components/Blog.jsx
//
// This component displays a single blog post.
// It shows the blog's title, author, URL, and likes count.
// In future exercises, we'll add functionality to like and delete blogs.

/**
 * Blog component - displays a single blog post
 *
 * @param {object} blog - The blog object containing id, title, author, url, and likes
 *
 * Example blog object:
 *   {
 *     id: '507f1f77bcf86cd799439011',
 *     title: 'Canonical string reduction',
 *     author: 'Edsger W. Dijkstra',
 *     url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
 *     likes: 12
 *   }
 */
const Blog = ({ blog }) => {
  // Style for the blog container - simple box with padding and border
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      {/* Display blog title and author */}
      <div>
        <strong>{blog.title}</strong> by {blog.author}
      </div>

      {/* Display blog URL */}
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </div>

      {/* Display likes count */}
      <div>
        Likes: <strong>{blog.likes}</strong>
      </div>
    </div>
  )
}

export default Blog
