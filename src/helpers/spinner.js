import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loader from "react-loader-spinner";

export default ({ top, design, designSize }) => {
  return (
    <Container>
      <Row>
        <Col />
        <Col>
          <div style={{ minHeight: "100vh" }}>
            <div
              style={
                top
                  ? { position: "relative", top: top }
                  : { position: "relative", top: "45vh" }
              }
            >
              <Loader
                type={design ? design : "MutatingDots"}
                color="#000000"
                height={designSize ? designSize : 100}
                width={designSize ? designSize : 100}
              />
            </div>
          </div>
        </Col>
        <Col />
      </Row>
    </Container>
  );
};
