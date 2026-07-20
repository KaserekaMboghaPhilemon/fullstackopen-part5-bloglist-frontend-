import styled from "styled-components";

const BlogContainer = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 32px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  border-radius: 20px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.15);
`;

const BlogHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 26px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
`;

const BlogTitle = styled.h2`
  margin: 0;
  font-size: 34px;
  line-height: 1.05;
  color: #0f172a;
`;

const BlogAuthor = styled.p`
  margin: 0;
  color: #475569;
  font-size: 15px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const BlogUrl = styled.a`
  display: inline-block;
  width: fit-content;
  margin-bottom: 26px;
  padding: 14px 18px;
  border-radius: 14px;
  background: #eef2ff;
  color: #1d4ed8;
  font-weight: 700;
  text-decoration: none;
  transition:
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: #dbeafe;
    transform: translateY(-2px);
    box-shadow: 0 12px 20px rgba(59, 130, 246, 0.12);
  }
`;

const BlogMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const LikesInfo = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 18px 20px;
  border-radius: 16px;
  background: #eef2ff;
  color: #0f172a;
  font-size: 15px;
  min-width: 180px;
`;

const AuthorSection = styled.p`
  margin: 0;
  color: #475569;
  font-size: 15px;
  line-height: 1.7;
  background: #ffffff;
  padding: 18px 20px;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.16);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 12px 22px;
  border-radius: 14px;
  border: 1px solid transparent;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
  text-transform: uppercase;

  ${(props) =>
    props.$variant === "danger"
      ? `
    background: #fef2f2;
    border-color: #fca5a5;
    color: #b91c1c;

    &:hover {
      background: #fee2e2;
      transform: translateY(-1px);
    }
  `
      : `
    background: #2563eb;
    border-color: #1d4ed8;
    color: white;

    &:hover {
      background: #1e40af;
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
