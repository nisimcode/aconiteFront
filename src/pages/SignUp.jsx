import {useContext, useState} from "react";
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import AuthContext from "../context/AuthContext.jsx";

export default function SignUp() {
  const {signUpUser} = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <>
      <Form onSubmit={signUpUser}>
        {/* Username input field */}
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
          />
        </Form.Group>
        {/* Email input field */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            name="email"
          />
        </Form.Group>
        {/* Password input field */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div style={{display: "flex"}}>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
            />
            <Button
              variant="link"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>Password Again</Form.Label>
          <div style={{display: "flex"}}>
            <Form.Control
              type={showPassword2 ? "text" : "password"}
              placeholder="Enter Password"
              name="password2"
            />
            <Button
              variant="link"
              onClick={() => setShowPassword2(!showPassword2)}
            >
              {showPassword2 ? "Hide" : "Show"}
            </Button>
          </div>
        </Form.Group>
        {/* Sign-up button */}
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </>
  );
}
