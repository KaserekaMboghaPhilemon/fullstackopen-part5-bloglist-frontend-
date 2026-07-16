import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Blog from "./Blog";

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("<Blog />", () => {
  test("renders the title and author as a link", () => {
    const blog = {
      id: "1",
      title: "A test blog",
      author: "Test Writer",
      url: "https://example.com/blog",
      likes: 42,
    };

    renderWithRouter(<Blog blog={blog} />);

    const link = screen.getByRole("link", {
      name: /A test blog Test Writer/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/blogs/1");
  });

  test("displays the URL when the link is visible", () => {
    const blog = {
      id: "1",
      title: "A test blog",
      author: "Test Writer",
      url: "https://example.com/blog",
      likes: 42,
    };

    renderWithRouter(<Blog blog={blog} />);

    expect(screen.getByText(/A test blog Test Writer/i)).toBeInTheDocument();
  });
});
