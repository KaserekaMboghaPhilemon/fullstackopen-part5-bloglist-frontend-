import { useState } from "react";
import styled from "styled-components";

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

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      await createBlog({ title, author, url });
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      // Error handling is performed in the parent component.
    }
  };

  return (
    <FormContainer>
      <form onSubmit={addBlog}>
        <FormGroup>
          <Label>title</Label>
          <Input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Enter blog title"
          />
        </FormGroup>
        <FormGroup>
          <Label>author</Label>
          <Input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Enter author name"
          />
        </FormGroup>
        <FormGroup>
          <Label>url</Label>
          <Input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="Enter blog URL"
          />
        </FormGroup>
        <Button type="submit">create</Button>
      </form>
    </FormContainer>
  );
};

export default BlogForm;
