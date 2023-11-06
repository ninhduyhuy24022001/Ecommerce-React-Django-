import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function FormContainer({ children }) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col
                    xs={12}
                    md={6}
                    className="border border-primary rounded p-3"
                >
                    {children}
                </Col>
            </Row>
        </Container>
    );
}

export default FormContainer;
