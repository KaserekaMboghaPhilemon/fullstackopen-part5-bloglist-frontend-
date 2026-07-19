import styled from "styled-components";

const BlogContainer = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 24px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(15, 23, 42, 0.08);
`;

const BlogHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 22px;
`;

const BlogTitle = styled.h2`
  margin: 0;
  font-size: 30px;
  line-height: 1.05;
  color: #111827;
`;

const BlogAuthor = styled.p`
  margin: 0;
  color: #4b5563;
  font-size: 15px;
`;

const BlogUrl = styled.a`
  display: inline-block;
  width: fit-content;
  margin-bottom: 22px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #f3f4f6;
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: #e0e7ff;
    transform: translateY(-1px);
  }
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const LikesInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #111827;
  font-size: 15px;
`;

const AuthorSection = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 14px;
  font-style: italic;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 10px 18px;
  border-radius: 10px;
  border: 1px solid transparent;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease,
    border-color 0.2s ease;
  text-transform: uppercase;

  ${(props) =>
    props.$variant === "danger"
      ? `
    background: transparent;
    border-color: #ef4444;
    color: #ef4444;

    &:hover {
      background: #fee2e2;
      transform: translateY(-1px);
    }
  `
      : `
    background: transparent;
    border-color: #3b82f6;
    color: #2563eb;

    &:hover {
      background: #dbeafe;
      transform: translateY(-1px);
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
      <BlogHeader>
        <BlogTitle>{blog.title}</BlogTitle>
        <BlogAuthor>by {blog.author}</BlogAuthor>
      </BlogHeader>

      <BlogUrl href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </BlogUrl>

      <BlogMeta>
        <LikesInfo>
          <span>{blog.likes} likes</span>
          {user && (
            <ActionButton type="button" onClick={() => onLike(blog)}>
              like
            </ActionButton>
          )}
        </LikesInfo>

        {isCreator && (
          <ButtonGroup>
            <ActionButton
              $variant="danger"
              type="button"
              onClick={() => onDelete(blog)}
            >
              remove
            </ActionButton>
          </ButtonGroup>
        )}
      </BlogMeta>

      <AuthorSection>
        Added by {blog.user?.name || blog.user?.username}
      </AuthorSection>
    </BlogContainer>
  );
}

export default BlogView;
