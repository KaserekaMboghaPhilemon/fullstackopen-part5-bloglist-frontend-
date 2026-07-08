import { useEffect, useState } from "react";
import Blog from "./components/Blog";
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
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchBlogs = async () => {
    const initialBlogs = await blogService.getAll();
    setBlogs(initialBlogs);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON);
      setUser(storedUser);
      blogService.setToken(storedUser.token);
      void fetchBlogs();
    }
  }, []);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("loggedBlogappUser");
    }
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userData = await loginService.login({ username, password });
      setUser(userData);
      blogService.setToken(userData.token);
      setUsername("");
      setPassword("");
      await fetchBlogs();
    } catch (error) {
      console.error(
        "Login structural error details:",
        error.response?.data || error.message,
      );

      if (error.response?.status === 401) {
        setErrorMessage("Wrong credentials");
      } else {
        setErrorMessage("Unable to reach the server");
      }

      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      await blogService.create({ title, author, url });
      setTitle("");
      setAuthor("");
      setUrl("");
      await fetchBlogs();
    } catch (error) {
      console.error(
        "Create blog error:",
        error.response?.data || error.message,
      );
      setErrorMessage("Failed to create blog");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

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
      <p>{user.name} logged in</p>
      <button type="button" onClick={handleLogout}>
        logout
      </button>

      <h3>create new</h3>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default App;
