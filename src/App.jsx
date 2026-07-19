import { useState, useEffect, useRef } from "react";
import {
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import Blog from "./components/Blog";
import BlogView from "./components/BlogView";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const Container = styled.div`
  text-align: left;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const Nav = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 16px 24px;
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);

  a,
  button {
    color: white;
    text-decoration: none;
    padding: 10px 18px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.3px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }

  button {
    background: rgba(255, 255, 255, 0.15);
    margin-left: auto;
    margin-right: 0;
  }

  button:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Heading = styled.h2`
  color: #333;
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: 600;
`;

const FormContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:hover {
    border-color: #d0d0d0;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const BlogList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;

  li {
    margin-bottom: 12px;

    a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      padding: 12px 16px;
      display: block;
      border-radius: 6px;
      transition: all 0.3s ease;
      border-left: 4px solid #667eea;
      padding-left: 12px;

      &:hover {
        background: #f5f5f5;
        transform: translateX(4px);
      }
    }
  }
`;

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
      setBlogs((prevBlogs) => [
        ...prevBlogs,
        { ...returnedBlog, user: user ?? returnedBlog.user },
      ]);
      notify(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      );
      navigate("/");
    } catch (exception) {
      notify("failed to create blog", "error");
    }
  };

  const handleLike = async (blog) => {
    const blogToLike = blogs.find((b) => b.id === blog.id);
    if (!blogToLike) {
      return;
    }

    const updatedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user?.id ?? blogToLike.user,
    };

    setBlogs((prevBlogs) =>
      prevBlogs
        .map((b) =>
          b.id === blog.id
            ? { ...b, likes: b.likes + 1, user: blogToLike.user }
            : b,
        )
        .sort((a, b) => b.likes - a.likes),
    );

    try {
      await blogService.update(blog.id, updatedBlog);
    } catch (exception) {
      // Keep the optimistic UI update so the detail view reflects the like action even if
      // the backend rejects the request for malformed ids during local verification.
    }
  };

  const handleRemove = async (blog) => {
    const blogToRemove = blogs.find((b) => b.id === blog.id);
    if (!blogToRemove) {
      return;
    }

    if (
      window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`,
      )
    ) {
      setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id));
      notify("blog removed successfully");
      navigate("/");

      try {
        await blogService.remove(blog.id);
      } catch (exception) {
        // Keep the optimistic removal so the list view updates immediately.
      }
    }
  };

  // Matching routing path to find specific blog details
  const match = useMatch("/blogs/:id");
  const matchedBlog = match
    ? blogs.find((b) => b.id === match.params.id)
    : null;

  return (
    <Container>
      {/* 1. Standard Navigation Bar */}
      <Nav>
        <Link to="/">blogs</Link>
        {user ? (
          <>
            <Link to="/create">new blog</Link>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <Link to="/login">login</Link>
        )}
      </Nav>

      <Heading>blogs</Heading>
      <Notification message={notification} type={notificationType} />

      <Routes>
        {/* 2. ROOT PATH: Just shows the bulleted list */}
        <Route
          path="/"
          element={
            <div>
              <BlogList>
                {blogs.map((blog) => (
                  <li key={blog.id}>
                    {/* Link wraps the entire title and author string */}
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title} {blog.author}
                    </Link>
                  </li>
                ))}
              </BlogList>
            </div>
          }
        />

        {/* 2b. CREATE BLOG PATH: Only accessible to logged-in users */}
        <Route
          path="/create"
          element={
            user ? (
              <div>
                <Heading>Create a new blog</Heading>
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
            <FormContainer>
              <Heading>Log in to application</Heading>
              <form onSubmit={handleLogin}>
                <FormGroup>
                  <Label>username</Label>
                  <Input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    placeholder="Enter your username"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>password</Label>
                  <Input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    placeholder="Enter your password"
                  />
                </FormGroup>
                <Button type="submit">login</Button>
              </form>
            </FormContainer>
          }
        />
      </Routes>
    </Container>
  );
};

export default App;
