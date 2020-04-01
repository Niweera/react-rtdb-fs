import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import { useFirebase } from "react-redux-firebase";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../../store/actions";
import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleEmail = e => {
    setCredentials({ ...credentials, email: e.target.value });
  };

  const handlePassword = e => {
    setCredentials({ ...credentials, password: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    signIn(credentials)(firebase, history);
  };

  return (
    <Container>
      <Row className={"mt-5"}>
        <Col />
        <Col>
          <Jumbotron fluid>
            <Row>
              <Col />
              <Col>
                <h1>Login</h1>
              </Col>
              <Col />
            </Row>
            <Form className={"pl-3 pr-3"}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={credentials.email}
                  onChange={handleEmail}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={credentials.password}
                  onChange={handlePassword}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Row>
                <Col />
                <Col>
                  <Link to={"/"} style={{ textDecoration: "none" }}>
                    <Button variant="outline-primary" block>
                      Home
                    </Button>
                  </Link>
                </Col>
                <Col>
                  {loading ? (
                    <Button variant="primary" block disabled>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Loading...</span>
                    </Button>
                  ) : (
                    <Button
                      variant="outline-primary"
                      type="submit"
                      block
                      onClick={handleSubmit}
                    >
                      Login
                    </Button>
                  )}
                </Col>
                <Col />
              </Row>
            </Form>
          </Jumbotron>
        </Col>
        <Col />
      </Row>
    </Container>
  );
};

export default Login;
