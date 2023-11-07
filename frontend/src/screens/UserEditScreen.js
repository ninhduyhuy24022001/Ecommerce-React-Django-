import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { getUserDetails, updateUser } from "../actions/userAction";
import { USER_UPDATE_RESET } from "../constants/userConstants";

function UserEditScreen() {
	const userId = useParams().id;

	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [isAdmin, setIsAdmin] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { user, error, loading } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			navigate("/admin/userlist");
		} else {
			if (!user.name || user._id !== Number(userId)) {
				dispatch(getUserDetails(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [navigate, user, userId, successUpdate, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateUser({
				_id: user._id,
				name,
				email,
				isAdmin,
			})
		);
	};

	return (
		<div>
			<Link to="/admin/userlist">Go Back</Link>
			{loadingUpdate && <Loader />}
			{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<FormContainer>
					<h1>Edit User</h1>

					<Form onSubmit={submitHandler} className="mb-3">
						<Form.Group controlId="name">
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								className="rounded"
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
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="isadmin">
							<Form.Check
								type="checkbox"
								label="Is Admin"
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
						</Form.Group>

						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				</FormContainer>
			)}
		</div>
	);
}

export default UserEditScreen;