import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";

import { saveShippingAddress } from "../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingAddress() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const navigate = useNavigate();
    const dispath = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        dispath(saveShippingAddress({ address, city, postalCode, country }));
        navigate("/payment");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping Address</h1>

            <Form onSubmit={submitHandler} className="mb-3">
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        className="rounded"
                        required
                        type="text"
                        placeholder="Enter address"
                        value={address ? address : ""}
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        className="rounded"
                        required
                        type="text"
                        placeholder="Enter city"
                        value={city ? city : ""}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        className="rounded"
                        required
                        type="text"
                        placeholder="Enter postal code"
                        value={postalCode ? postalCode : ""}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        className="rounded"
                        required
                        type="text"
                        placeholder="Enter country"
                        value={country ? country : ""}
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Payment
                </Button>
            </Form>
        </FormContainer>
    );
}

export default ShippingAddress;
