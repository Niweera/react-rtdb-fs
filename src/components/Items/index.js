import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { isEmpty, isLoaded } from "react-redux-firebase";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { useFirestore, useFirebase } from "react-redux-firebase";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Items = () => {
  const firestore = useFirestore();
  const firebase = useFirebase();
  const auth = useSelector(state => state.firebase.auth);
  const todos = useSelector(state => state.firebase.ordered.todos);

  const todos_fs = useSelector(state => state.firestore.ordered.todos);

  const handleRemoveRTDB = async key => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      await firebase.remove(`todos/${key}`);
    }
  };

  const handleRemoveFS = async key => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      await firestore.delete(`todos/${key}`);
    }
  };

  return (
    <Container>
      <Row className={"mt-5"}>
        <Col />
        <Col>
          <ListGroup className={"text-center"}>
            <ListGroup.Item variant="secondary">Items in RTDB</ListGroup.Item>
            {!isLoaded(todos) && (
              <ListGroup.Item>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </ListGroup.Item>
            )}
            {todos &&
              Object.keys(todos).map(key => (
                <OverlayTrigger
                  key={key}
                  placement={"right"}
                  overlay={
                    isLoaded(auth) && !isEmpty(auth) ? (
                      <Tooltip id={`tooltip-${key}`}>Click to remove</Tooltip>
                    ) : (
                      <Tooltip id={`tooltip-${key}`}>Login to remove</Tooltip>
                    )
                  }
                >
                  <ListGroup.Item
                    onClick={() => handleRemoveRTDB(todos[key].key)}
                    action
                  >
                    {todos[key].value.text}
                  </ListGroup.Item>
                </OverlayTrigger>
              ))}
            {isLoaded(todos) && isEmpty(todos) && (
              <ListGroup.Item>No items in the RTDB</ListGroup.Item>
            )}
          </ListGroup>
        </Col>
        <Col />
      </Row>

      <Row className={"mt-5"}>
        <Col />
        <Col>
          <ListGroup className={"text-center"}>
            <ListGroup.Item variant="secondary">
              Items in Firestore
            </ListGroup.Item>
            {!isLoaded(todos_fs) && (
              <ListGroup.Item>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </ListGroup.Item>
            )}
            {todos_fs &&
              Object.keys(todos_fs).map(key => (
                <OverlayTrigger
                  key={key}
                  placement={"right"}
                  overlay={
                    isLoaded(auth) && !isEmpty(auth) ? (
                      <Tooltip id={`tooltip-${key}`}>Click to remove</Tooltip>
                    ) : (
                      <Tooltip id={`tooltip-${key}`}>Login to remove</Tooltip>
                    )
                  }
                >
                  <ListGroup.Item
                    onClick={() => handleRemoveFS(todos_fs[key].id)}
                    action
                  >
                    {todos_fs[key].text}
                  </ListGroup.Item>
                </OverlayTrigger>
              ))}
            {todos_fs && Object.keys(todos_fs).length <= 0 && (
              <ListGroup.Item>No items in the Firestore</ListGroup.Item>
            )}
          </ListGroup>
        </Col>
        <Col />
      </Row>
    </Container>
  );
};

export default Items;
