import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import Blog from "./Blog";

describe("<Blog />", () => {
  test("renders the title and author, but does not render the URL or likes by default", () => {
    const blog = {
      title: "A test blog",
      author: "Test Writer",
      url: "https://example.com/blog",
      likes: 42,
    };

    render(
      <Blog
        blog={blog}
        handleLike={() => {}}
        handleDelete={() => {}}
        currentUser={null}
      />,
    );

    expect(screen.getByText(/A test blog/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Writer/i)).toBeInTheDocument();
    expect(
      screen.getByText(/A test blog/i).closest(".blog-summary"),
    ).toBeInTheDocument();
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
    expect(screen.queryByText(/likes 42/i)).not.toBeInTheDocument();
  });

  test("shows the URL, likes, and user when the view button is clicked", async () => {
    const blog = {
      title: "A test blog",
      author: "Test Writer",
      url: "https://example.com/blog",
      likes: 42,
      user: { name: "Test User" },
    };

    const user = userEvent.setup();

    render(
      <Blog
        blog={blog}
        handleLike={() => {}}
        handleDelete={() => {}}
        currentUser={null}
      />,
    );

    await user.click(screen.getByRole("button", { name: /view/i }));

    expect(screen.getByText(blog.url)).toBeInTheDocument();
    expect(screen.getByText(/likes 42/i)).toBeInTheDocument();
    expect(screen.getByText(/Test User/i)).toBeInTheDocument();
  });
});
