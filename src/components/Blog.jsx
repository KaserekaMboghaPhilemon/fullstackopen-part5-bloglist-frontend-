import { useState } from "react";

// Blog component presents a minimal blog summary and an expandable
// details view. The component owns its visibility state because each
// blog must independently toggle its details without affecting other
// entries — using a shared Togglable would complicate per-item state.
const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  // Local boolean toggling whether full blog details are visible.
  // This avoids lifting UI-only state to the global application state,
  // preventing unnecessary re-renders of sibling components.
  const [visible, setVisible] = useState(false);

  // Inline style object intentionally mirrors the exercise specification
  // and documents layout choices (padding and border) for visual grouping.
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  // Simple toggle performing inversion of the visibility flag. Kept
  // as a discrete function so it can be passed directly to UI handlers.
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <div className="blog-summary">
        {blog.title} {blog.author}
        <button type="button" onClick={toggleVisibility}>
          {visible ? "hide" : "view"}
        </button>
      </div>

      {/*
        Render details only when visible. The details block intentionally
        shows the canonical blog fields: url, likes (with a like control),
        and the creator's display name. The like/remove controls are UI
        affordances that call handlers supplied by the parent so side
        effects (network requests) remain centralized in App.jsx.
      */}
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{" "}
            {/*
              The like button triggers an HTTP PUT via App.jsx. We don't
              implement the network call here to keep this component
              focused on presentation; this also simplifies unit testing.
            */}
            <button type="button" onClick={handleLike}>
              like
            </button>
          </div>

          {/*
            Show the creator's name when available. Note: after optimistic
            updates the backend may return only an id for `user`. Parent
            code is responsible for preserving a populated user object to
            avoid transient erasure of the display name.
          */}
          <div>{blog.user?.name}</div>

          {/*
            Only show the remove button to the creator. We compare the
            usernames (a stable, human-readable key) rather than object
            identity because the frontend may hold a populated object while
            the server returns only an id on some operations.
          */}
          {blog.user &&
            currentUser &&
            blog.user.username === currentUser.username && (
              <div>
                <button type="button" onClick={() => handleDelete(blog)}>
                  remove
                </button>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default Blog;
