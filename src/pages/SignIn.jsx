import {useContext} from "react";
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import AuthContext from "../context/AuthContext.jsx";
import {Link} from "react-router-dom";

/**
 * Renders a sign-in form and handles sign-in functionality.
 *
 * @returns {JSX.Element} The sign-in form component.
 */
export default function SignIn() {
  const {signInUser} = useContext(AuthContext);
  return (
    <>
      <Link
        to="/signup"
        style={{textDecoration: "none"}}
      >
        Not a member? Sign up here!
      </Link>
      {/* Sign-in form */}
      <Form style={{marginTop: "1em"}} onSubmit={signInUser}>
        {/* Username input field */}
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
          />
        </Form.Group>
        {/* Password input field */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
          />
        </Form.Group>
        {/* Sign-in button */}
        <Button
          variant="primary"
          type="submit"
        >
          Sign in
        </Button>
      </Form>
    </>
  );
}
