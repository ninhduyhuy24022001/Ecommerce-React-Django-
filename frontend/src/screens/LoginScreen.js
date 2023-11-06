import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { login } from "../actions/userAction";

function LoginScreen() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const negative = useNavigate();
    const dispatch = useDispatch();
    const redirect = window.location.search
        ? window.location.search.split("=")[1]
        : "/";

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, error, loading } = userLogin;

    useEffect(() => {
        if (userInfo) {
            negative(redirect);
        }
    }, [negative, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} className="mb-3">
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        className="rounded"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className="rounded"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>

            <Row>
                <Col>
                    New Customer ?{" "}
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : "/register"
                        }
                    >
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default LoginScreen;
