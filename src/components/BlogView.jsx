import styled from "styled-components";

const BlogContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
`;

const BlogTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 600;
`;

const BlogInfo = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #667eea;
`;

const BlogUrl = styled.a`
  color: #667eea;
  text-decoration: none;
  word-break: break-all;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`;

const LikesSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const AuthorSection = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
  font-style: italic;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${(props) =>
    props.variant === "danger"
      ? `
    background: #ef4444;
    color: white;

    &:hover {
      background: #dc2626;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    }
  `
      : `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
    }
  `}
`;

function BlogView({ blog, user, onLike, onDelete }) {
  if (!blog) {
    return <BlogContainer>Blog not found</BlogContainer>;
  }

  const isCreator =
    user &&
    ((blog.user &&
      typeof blog.user === "object" &&
      blog.user.username === user.username) ||
      (typeof blog.user === "string" && blog.user === user.id) ||
      (typeof blog.user === "string" && blog.user === user.username));

  return (
    <BlogContainer>
      <BlogTitle>
        {blog.title} {blog.author}
      </BlogTitle>

      <BlogInfo>
        <BlogUrl href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </BlogUrl>
      </BlogInfo>

      <LikesSection>
        likes {blog.likes}
        {user && (
          <ActionButton type="button" onClick={() => onLike(blog)}>
            like
          </ActionButton>
        )}
      </LikesSection>

      <AuthorSection>Added by {blog.user?.name}</AuthorSection>

      {isCreator && (
        <ButtonGroup>
          <ActionButton
            variant="danger"
            type="button"
            onClick={() => onDelete(blog)}
          >
            remove
          </ActionButton>
        </ButtonGroup>
      )}
    </BlogContainer>
  );
}

export default BlogView;
