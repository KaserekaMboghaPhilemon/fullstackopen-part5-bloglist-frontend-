import { useEffect, useState, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const blogFormRef = useRef();

  const fetchBlogs = async () => {
    const initialBlogs = await blogService.getAll();
    setBlogs(initialBlogs);
  };

  // step5.2: restore the saved user session on first render
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON);
      setUser(storedUser);
      blogService.setToken(storedUser.token); // Gives the token to our API service
      fetchBlogs(); // Loads the blogs immediately for this authenticated session
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      // step5.2: save the logged-in user to browser storage
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");

      setNotification({
        text: `${user.name} logged in`,
        type: "success",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);

      await fetchBlogs();
    } catch (error) {
      console.error(
        "Login error details:",
        error.response?.data || error.message,
      );

      // Set notification state with error type
      setNotification({
        text: "wrong username or password",
        type: "error",
      });

      // Wipes out notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    // step5.2: remove the saved session from browser storage
    window.localStorage.removeItem("loggedBlogappUser");

    setUser(null);
    blogService.setToken(null);
  };

  const createBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject);
      await fetchBlogs();

      // Automatically collapses the Togglable form container
      blogFormRef.current && blogFormRef.current.toggleVisibility();

      setNotification({
        text: `a new blog ${blogObject.title} by ${blogObject.author} added`,
        type: "success",
      });

      setTimeout(() => {
        setNotification(null);
      }, 5000);

      return newBlog;
    } catch (error) {
      console.error(
        "Create blog error:",
        error.response?.data || error.message,
      );

      setNotification({
        text: "Failed to create blog entry",
        type: "error",
      });

      setTimeout(() => {
        setNotification(null);
      }, 5000);

      throw error;
    }
  };

  const handleLike = async (blogToLike) => {
    try {
      const updatedBlog = {
        title: blogToLike.title,
        author: blogToLike.author,
        url: blogToLike.url,
        likes: blogToLike.likes + 1,
        user:
          blogToLike.user &&
          (blogToLike.user.id || blogToLike.user._id || blogToLike.user),
      };

      const returnedBlog = await blogService.update(blogToLike.id, updatedBlog);
      const blogWithUser =
        returnedBlog.user && returnedBlog.user.name
          ? returnedBlog
          : { ...returnedBlog, user: blogToLike.user };

      setBlogs(
        blogs.map((blog) => (blog.id !== blogToLike.id ? blog : blogWithUser)),
      );
    } catch (error) {
      console.error(
        "Like update failed:",
        error.response?.data || error.message,
      );
    }
  };

  const handleDelete = async (blogToDelete) => {
    try {
      const ok = window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`,
      );
      if (!ok) return;

      await blogService.remove(blogToDelete.id);
      setBlogs(blogs.filter((b) => b.id !== blogToDelete.id));
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>

        {notification && <Notification messageObj={notification} />}

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  const blogsSorted = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>blogs</h2>

      <Notification messageObj={notification} />

      <p>{user.name} logged in</p>
      <button type="button" onClick={handleLogout}>
        logout
      </button>

      <h3>create new</h3>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {blogsSorted.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog)}
          handleDelete={() => handleDelete(blog)}
          currentUser={user}
        />
      ))}
    </div>
  );
}

export default App;
