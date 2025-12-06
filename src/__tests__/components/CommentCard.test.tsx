import { render, screen } from "@testing-library/react";
import CommentCard from "../../components/CommentCard";

describe("CommentCard", () => {
  const comment = {
    id: "6",
    name: "et fugit eligendi deleniti quidem qui sint nihil autem",
    email: "Presley.Mueller@myrl.com",
    body: "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in",
    __typename: "Comment",
  };
  test("renders comment text", () => {
    render(<CommentCard comment={comment} />);
    const commentElement = screen.getByText(
      /doloribus at sed quis culpa deserunt consectetur qui praesentium/i
    );
    expect(commentElement).toBeInTheDocument();
  });

  test("renders author name", () => {
    render(<CommentCard comment={comment} />);
    const authorElement = screen.getByText(
      /et fugit eligendi deleniti quidem qui sint nihil autem/i
    );
    expect(authorElement).toBeInTheDocument();
  });
});
