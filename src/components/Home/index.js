import React from "react";
import { useSelector } from "react-redux";
import {
  useFirebaseConnect,
  useFirestoreConnect,
  isLoaded,
  isEmpty
} from "react-redux-firebase";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { Link, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { signOut } from "../../store/actions";
import { useFirebase } from "react-redux-firebase";
import Items from "../Items";

const Home = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const auth = useSelector(state => state.firebase.auth);
  useFirebaseConnect([
    "todos" // { path: '/todos' } // object notation
  ]);

  useFirestoreConnect([
    { collection: "todos" } // or 'todos'
  ]);

  const handleLogout = e => {
    e.preventDefault();
    signOut()(firebase, history);
  };

  return (
    <Container>
      <Row className={"mt-5 text-center"}>
        <Col />
        <Col>
          <h1>Home Page</h1>
        </Col>
        <Col />
      </Row>

      <Items />

      <Row className={"mt-5 mb-5"}>
        <Col />
        <Col>
          <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
            <Button
              variant="outline-primary"
              disabled={!isLoaded(auth) || isEmpty(auth)}
              block
            >
              Go to Dashboard
            </Button>
          </Link>
        </Col>
        <Col>
          {isLoaded(auth) && !isEmpty(auth) ? (
            <Button onClick={handleLogout} variant="outline-danger" block>
              Logout
            </Button>
          ) : (
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <Button variant="outline-primary" block>
                Login
              </Button>
            </Link>
          )}
        </Col>
        <Col />
      </Row>
    </Container>
  );
};

export default Home;
