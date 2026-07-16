import { useState, useEffect, useRef } from "react";
import {
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Blog from "./components/Blog";
import BlogView from "./components/BlogView";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("success");

  const blogFormRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notify = (message, type = "success") => {
    setNotification(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      notify("welcome back!");
      navigate("/");
    } catch (exception) {
      notify("wrong username or password", "error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    notify("logged out successfully");
    navigate("/");
  };

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      notify(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      );
      navigate("/");
    } catch (exception) {
      notify("failed to create blog", "error");
    }
  };

  const handleLike = async (id) => {
    const blogToLike = blogs.find((b) => b.id === id);
    const updatedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    };

    try {
      const returnedBlog = await blogService.update(id, updatedBlog);
      // Preserving user details from the state since backend might only return user ID
      const updatedBlogs = blogs.map((b) =>
        b.id === id ? { ...returnedBlog, user: blogToLike.user } : b,
      );
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
    } catch (exception) {
      notify("failed to like blog", "error");
    }
  };

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find((b) => b.id === id);
    if (
      window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`,
      )
    ) {
      try {
        await blogService.remove(id);
        setBlogs(blogs.filter((b) => b.id !== id));
        notify("blog removed successfully");
        navigate("/");
      } catch (exception) {
        notify("failed to remove blog", "error");
      }
    }
  };

  // Matching routing path to find specific blog details
  const match = useMatch("/blogs/:id");
  const matchedBlog = match
    ? blogs.find((b) => b.id === match.params.id)
    : null;

  // Common Styles for exact matches with Course screenshots
  const navStyle = {
    background: "#eeeeee",
    padding: "10px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "15px",
  };

  const containerStyle = {
    textAlign: "left",
    fontFamily: "sans-serif",
    padding: "10px",
  };

  return (
    <div style={containerStyle}>
      {/* 1. Standard Navigation Bar */}
      <div style={navStyle}>
        <Link to="/">blogs</Link>
        {user ? (
          <>
            <Link to="/create">new blog</Link>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <Link to="/login">login</Link>
        )}
      </div>

      <h2>blogs</h2>
      <Notification message={notification} type={notificationType} />

      <Routes>
        {/* 2. ROOT PATH: Just shows the bulleted list */}
        <Route
          path="/"
          element={
            <div>
              <ul style={{ paddingLeft: "20px", marginTop: "15px" }}>
                {blogs.map((blog) => (
                  <li key={blog.id} style={{ marginBottom: "5px" }}>
                    {/* Link wraps the entire title and author string */}
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title} {blog.author}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          }
        />

        {/* 2b. CREATE BLOG PATH: Only accessible to logged-in users */}
        <Route
          path="/create"
          element={
            user ? (
              <div>
                <h2>Create a new blog</h2>
                <BlogForm createBlog={addBlog} />
              </div>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />

        {/* 3. SINGLE BLOG VIEW PATH */}
        <Route
          path="/blogs/:id"
          element={
            matchedBlog ? (
              <BlogView
                blog={matchedBlog}
                user={user}
                onLike={handleLike}
                onDelete={handleRemove}
              />
            ) : (
              <p>Blog not found</p>
            )
          }
        />

        {/* 4. LOGIN PATH */}
        <Route
          path="/login"
          element={
            <div>
              <h2>Log in to application</h2>
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
          }
        />
      </Routes>
    </div>
  );
};

export default App;
