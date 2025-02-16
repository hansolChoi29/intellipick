import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import SignIn from "../pages/SignIn";
test("renders Sign In button", () => {
    render(_jsx(SignIn, {}));
    const signInButton = screen.getByText(/로그인/i);
    expect(signInButton).toBeInTheDocument();
});
