import { render, screen } from "@testing-library/react";
import PostPagination from "../../components/post/PostPagination";

test("renders PostPagination component", () => {
  render(
    <PostPagination
      currentPage={1}
      limit={10}
      onLimitChange={() => {}}
      onNext={() => {}}
      onPrevious={() => {}}
      postsCount={10}
      totalCount={100}
      totalPages={10}
    />
  );
  const paginationElement = screen.getByText(/page 1 of 10/i);
  expect(paginationElement).toBeInTheDocument();
});
