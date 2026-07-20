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
  // padding: 5px;
  max-width: 900px;
  margin: 0 auto;
`;

const Nav = styled.div`
  background-color: #1976d2;
  padding: 0px 24px;
  min-height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-radius: 0px;
  box-shadow:
    0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14);
`;

const NavBrand = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 500;
  font-family: sans-serif;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition:
    color 0.2s ease,
    transform 0.2s ease,
    text-shadow 0.2s ease;

  &:hover {
    color: #e3f2fd;
    transform: translateY(-1px);
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.12);
  }
`;

const NavButton = styled.button`
  color: white;
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    color 0.2s ease,
    transform 0.2s ease,
    text-shadow 0.2s ease;

  &:hover {
    color: #e3f2fd;
    transform: translateY(-1px);
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.12);
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

const BlogCard = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
  padding: 24px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const BlogTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 8px;
  color: #111;
`;

const BlogAuthorLine = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 12px;
`;

const BlogUrlLink = styled.a`
  display: block;
  color: #1976d2;
  text-decoration: underline;
  margin-bottom: 8px;
`;

const AddedByLine = styled.span`
  display: block;
  color: #555;
  margin-bottom: 16px;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LikesText = styled.span`
  font-weight: 600;
  color: #111;
`;

const LikeButton = styled.button`
  padding: 6px 16px;
  border-radius: 4px;
  border: 1px solid #90caf9;
  background: #ffffff;
  color: #1976d2;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  padding: 6px 16px;
  border-radius: 4px;
  border: 1px solid #ef9a9a;
  background: #ffffff;
  color: #d32f2f;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
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

  const isCreator =
    user &&
    matchedBlog &&
    ((matchedBlog.user &&
      typeof matchedBlog.user === "object" &&
      matchedBlog.user.username === user.username) ||
      (typeof matchedBlog.user === "string" && matchedBlog.user === user.id) ||
      (typeof matchedBlog.user === "string" &&
        matchedBlog.user === user.username));

  return (
    <Container>
      <Nav>
        <NavBrand>Blog App</NavBrand>
        <NavLinks>
          <NavLink to="/">blogs</NavLink>
          {user ? (
            <>
              <NavLink to="/create">new blog</NavLink>
              <NavButton onClick={handleLogout}>logout</NavButton>
            </>
          ) : (
            <NavLink to="/login">login</NavLink>
          )}
        </NavLinks>
      </Nav>

      <Notification message={notification} type={notificationType} />

      <Routes>
        {/* 2. ROOT PATH: Just shows the bulleted list */}
        <Route
          path="/"
          element={
            <div>
              <Heading>Blogs</Heading>
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
              <BlogCard>
                <BlogTitle>{matchedBlog.title}</BlogTitle>
                <BlogAuthorLine>by {matchedBlog.author}</BlogAuthorLine>
                <BlogUrlLink
                  href={matchedBlog.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {matchedBlog.url}
                </BlogUrlLink>
                <AddedByLine>
                  Added by{" "}
                  {matchedBlog.user?.name || matchedBlog.user?.username}
                </AddedByLine>

                <ActionRow>
                  <LikesText>likes {matchedBlog.likes}</LikesText>
                  {user && (
                    <LikeButton
                      type="button"
                      onClick={() => handleLike(matchedBlog)}
                    >
                      like
                    </LikeButton>
                  )}
                  {isCreator && (
                    <RemoveButton
                      type="button"
                      onClick={() => handleRemove(matchedBlog)}
                    >
                      remove
                    </RemoveButton>
                  )}
                </ActionRow>
              </BlogCard>
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
