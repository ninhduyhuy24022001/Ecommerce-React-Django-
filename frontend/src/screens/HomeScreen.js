import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import { listProducts } from "../actions/productAction";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
	const dispatch = useDispatch();
	const location = useLocation();
	const productList = useSelector((state) => state.productList);
	const { error, loading, products } = productList;

	useEffect(() => {
		const keyword = location.search;
		console.log(keyword); // Log the updated keyword
		dispatch(listProducts(keyword));
	}, [dispatch, location.search]);

	return (
		<div>
			<h1>Latest Component</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</div>
	);
}

export default HomeScreen;
