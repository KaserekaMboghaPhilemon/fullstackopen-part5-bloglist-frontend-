import { useEffect, useState, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
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

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      // Send the data to the backend via our service
      const newBlog = await blogService.create({ title, author, url });

      // Concatenate the newly returned blog object directly into the active UI state array
      setBlogs(blogs.concat(newBlog));
      // Automatically collapses the Togglable form container
      blogFormRef.current && blogFormRef.current.toggleVisibility();

      // Set success notification message
      setNotification({
        text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        type: "success",
      });

      // Clear the text input fields completely on successful addition
      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogFormVisible(false);

      // Wipe out notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
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
        <form onSubmit={handleCreateBlog}>
          <div>
            title
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default App;
