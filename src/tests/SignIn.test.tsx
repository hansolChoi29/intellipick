import { render, screen } from "@testing-library/react";
import SignIn from "../pages/SignIn";

test("renders Sign In button", () => {
  render(<SignIn />);

  const signInButton = screen.getByText(/로그인/i);
  expect(signInButton).toBeInTheDocument();
});
