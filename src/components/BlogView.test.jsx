import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import BlogView from "./BlogView";

describe("<BlogView />", () => {
  const blog = {
    id: "123",
    title: "Test Blog Title",
    author: "John Doe",
    url: "https://example.com/blog",
    likes: 5,
    user: {
      id: "user1",
      name: "John Doe",
      username: "johndoe",
    },
  };

  test("displays blog information and likes count to unauthenticated users", () => {
    render(
      <BlogView blog={blog} user={null} onLike={vi.fn()} onDelete={vi.fn()} />,
    );

    expect(screen.getByText(/Test Blog Title/i)).toBeInTheDocument();
    expect(screen.getAllByText(/John Doe/i).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(blog.url)).toBeInTheDocument();
    expect(screen.getByText(/likes 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Added by John Doe/i)).toBeInTheDocument();
  });

  test("does not show any buttons for unauthenticated users", () => {
    render(
      <BlogView blog={blog} user={null} onLike={vi.fn()} onDelete={vi.fn()} />,
    );

    expect(
      screen.queryByRole("button", { name: /like/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /remove/i }),
    ).not.toBeInTheDocument();
  });

  test("shows the like button for authenticated non-creator users", () => {
    const otherUser = {
      id: "user2",
      name: "Jane Smith",
      username: "janesmith",
    };

    render(
      <BlogView
        blog={blog}
        user={otherUser}
        onLike={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /like/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /remove/i }),
    ).not.toBeInTheDocument();
  });

  test("shows both like and remove buttons for the blog creator", () => {
    const creator = {
      id: "user1",
      name: "John Doe",
      username: "johndoe",
    };

    render(
      <BlogView
        blog={blog}
        user={creator}
        onLike={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /like/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
  });

  test("calls onLike when the like button is clicked", async () => {
    const mockOnLike = vi.fn();
    const user = userEvent.setup();

    const authenticatedUser = {
      id: "user2",
      name: "Jane Smith",
      username: "janesmith",
    };

    render(
      <BlogView
        blog={blog}
        user={authenticatedUser}
        onLike={mockOnLike}
        onDelete={vi.fn()}
      />,
    );

    const likeButton = screen.getByRole("button", { name: /like/i });
    await user.click(likeButton);

    expect(mockOnLike).toHaveBeenCalledTimes(1);
    expect(mockOnLike).toHaveBeenCalledWith(blog);
  });

  test("calls onDelete when the remove button is clicked by the creator", async () => {
    const mockOnDelete = vi.fn();
    const user = userEvent.setup();

    const creator = {
      id: "user1",
      name: "John Doe",
      username: "johndoe",
    };

    render(
      <BlogView
        blog={blog}
        user={creator}
        onLike={vi.fn()}
        onDelete={mockOnDelete}
      />,
    );

    const removeButton = screen.getByRole("button", { name: /remove/i });
    await user.click(removeButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(blog);
  });

  test("displays the URL as a clickable link", () => {
    render(
      <BlogView blog={blog} user={null} onLike={vi.fn()} onDelete={vi.fn()} />,
    );

    const link = screen.getByRole("link", { name: blog.url });
    expect(link).toHaveAttribute("href", blog.url);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
