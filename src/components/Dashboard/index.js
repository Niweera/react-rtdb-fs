import React from "react";
import {
  useFirebase,
  useFirestore,
  useFirebaseConnect,
  useFirestoreConnect
} from "react-redux-firebase";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Items from "../Items";
import { addItemToFS, addItemToRTDB } from "../../store/actions";

const Home = () => {
  const firebase = useFirebase();
  const firestore = useFirestore();

  useFirebaseConnect([
    "todos" // { path: '/todos' } // object notation
  ]);

  useFirestoreConnect([
    { collection: "todos" } // or 'todos'
  ]);

  const addSampleTodo = () => {
    const sampleTodo = { text: Math.random(), done: false };
    return addItemToRTDB(sampleTodo)(firebase);
  };

  const addToFirestore = () => {
    const sampleTodo = { text: Math.random() };
    return addItemToFS(sampleTodo)(firestore);
  };

  return (
    <Container>
      <Row className={"mt-5 text-center"}>
        <Col />
        <Col>
          <h1>Dashboard</h1>
        </Col>
        <Col />
      </Row>

      <Items />

      <Row className={"mt-5"}>
        <Col />
        <Col>
          <Button onClick={addSampleTodo} variant="outline-primary" block>
            Add to RTDB
          </Button>
        </Col>
        <Col>
          <Button block onClick={addToFirestore} variant="outline-primary">
            Add to Firestore
          </Button>
        </Col>
        <Col />
      </Row>
      <Row className={"mt-5 mb-5"}>
        <Col />
        <Col>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Button block variant="outline-secondary">
              Go back to Home
            </Button>
          </Link>
        </Col>
        <Col />
      </Row>
    </Container>
  );
};

export default Home;
