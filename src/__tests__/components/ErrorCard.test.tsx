import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorCard from "../../components/ErrorCard";
test("renders ErrorCard component", () => {
  const error = { name: "Error", message: "An error occurred" };
  render(<ErrorCard error={error} />);
  expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
});
