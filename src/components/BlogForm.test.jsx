import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("updates parent state and calls createBlog when a new blog is created", async () => {
    const mockCreateBlog = vi.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={mockCreateBlog} />);

    const textboxes = screen.getAllByRole("textbox");
    const titleInput = textboxes[0];
    const authorInput = textboxes[1];
    const urlInput = textboxes[2];
    const submitButton = screen.getByRole("button", { name: /create/i });

    await user.type(titleInput, "Test Blog Title");
    await user.type(authorInput, "Test Author");
    await user.type(urlInput, "https://example.com/test");
    await user.click(submitButton);

    expect(mockCreateBlog).toHaveBeenCalledWith({
      title: "Test Blog Title",
      author: "Test Author",
      url: "https://example.com/test",
    });
  });
});
