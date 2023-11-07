import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { listProductsDetails, updateProduct } from "../actions/productAction";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen() {
	const productId = useParams().id;

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { product, error, loading } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			navigate("/admin/productlist");
		} else {
			if (!product.name || product._id !== Number(productId)) {
				dispatch(listProductsDetails(productId));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		}
	}, [navigate, product, productId, dispatch, successUpdate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateProduct({ _id: productId, name, price, image, brand, category, countInStock, description }));
	};

	return (
		<div>
			<Link to="/admin/productlist">Go Back</Link>

			{loadingUpdate && <Loader />}
			{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<FormContainer>
					<h1>Edit Product</h1>

					<Form onSubmit={submitHandler} className="mb-3">
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								className="rounded"
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								className="rounded"
								type="number"
								placeholder="Enter price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								className="rounded"
								type="text"
								placeholder="Enter Image"
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="brand">
							<Form.Label>Brand</Form.Label>
							<Form.Control
								className="rounded"
								type="text"
								placeholder="Enter brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								className="rounded"
								type="text"
								placeholder="Enter Category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="countinstock">
							<Form.Label>Price</Form.Label>
							<Form.Control
								className="rounded"
								type="number"
								placeholder="Enter stock"
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								className="rounded"
								type="text"
								placeholder="Enter Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
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

export default ProductEditScreen;
