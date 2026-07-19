function BlogView({ blog, user, onLike, onDelete }) {
  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div
      style={{
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        likes {blog.likes}
        {user && (
          <button type="button" onClick={() => onLike(blog)}>
            like
          </button>
        )}
      </div>
      <div>Added by {blog.user?.name}</div>
      {user &&
        ((blog.user &&
          typeof blog.user === "object" &&
          blog.user.username === user.username) ||
          (typeof blog.user === "string" && blog.user === user.id) ||
          (typeof blog.user === "string" && blog.user === user.username)) && (
          <div>
            <button type="button" onClick={() => onDelete(blog)}>
              remove
            </button>
          </div>
        )}
    </div>
  );
}

export default BlogView;
