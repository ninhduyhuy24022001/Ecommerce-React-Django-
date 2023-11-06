import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";

import { savePaymentMethod } from "../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentMethod() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const navigate = useNavigate();
    const dispath = useDispatch();

    if (!shippingAddress.address) {
        navigate("/shipping");
    }

    const submitHandler = (e) => {
        e.preventDefault();

        dispath(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>

            <Form onSubmit={submitHandler} className="mb-3">
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Paypal or Credit Card"
                            id="paypal"
                            name="paymentMethod"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Payment
                </Button>
            </Form>
        </FormContainer>
    );
}

export default PaymentMethod;
