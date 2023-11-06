import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { register } from "../actions/userAction";

function RegisterScreen() {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setconfirmPassword] = useState();
	const [message, setMessage] = useState();

	const negative = useNavigate();
	const dispatch = useDispatch();
	const redirect = window.location.search ? window.location.search.split("=")[1] : "/";

	const userRegister = useSelector((state) => state.userRegister);
	const { userInfo, error, loading } = userRegister;

	useEffect(() => {
		if (userInfo) {
			negative(redirect);
		}
	}, [negative, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Password do not match!");
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer>
			<h1>Register</h1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}

			<Form onSubmit={submitHandler} className="mb-3">
				<Form.Group controlId="name">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						className="rounded"
						required
						type="text"
						placeholder="Enter name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						className="rounded"
						required
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
						required
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="passwordConfirm" className="mb-3">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						className="rounded"
						required
						type="password"
						placeholder="Confirm password"
						value={confirmPassword}
						onChange={(e) => setconfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary">
					Register
				</Button>
			</Form>

			<Row>
				<Col>
					Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Sign In</Link>
				</Col>
			</Row>
		</FormContainer>
	);
}

export default RegisterScreen;
