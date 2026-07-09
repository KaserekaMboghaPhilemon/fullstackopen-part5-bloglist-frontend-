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

      // Clear the text input fields completely on successful addition
      setTitle("");
      setAuthor("");
      setUrl("");
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

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default App;
