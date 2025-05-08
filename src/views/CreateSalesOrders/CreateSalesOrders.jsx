import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from 'config/constant';
import { Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { showToast } from 'components/ToastNotifier/ToastNotifier';
const handleError = () => showToast('error', 'error');
const handleValidation = () => showToast('info', 'validation');

const CreateSalesOrders = () => {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [orderSummary, setOrderSummary] = useState([]);
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    useEffect(() => {
        Promise.all([
            axios.get(`${BASE_URL}customers`, config),
            axios.get(`${BASE_URL}products`, config),
            axios.get(`${BASE_URL}sizes`, config),
            axios.get(`${BASE_URL}colors`, config)
        ])
            .then(([customersRes, productsRes, sizesRes, colorsRes]) => {
                setCustomers(customersRes.data.data);
                setProducts(productsRes.data.data);
                setSizes(sizesRes.data.data);
                setColors(colorsRes.data.data);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    handleError()
                } else {
                    handleError()
                }
            });
    }, []);

    const handleAddToOrder = () => {
        const productID = document.getElementById('productID').value;
        const sizeID = document.getElementById('sizeID').value;
        const colorID = document.getElementById('colorID').value;
        const quantity = document.getElementById('quantity').value;

        if (productID && sizeID && colorID && quantity) {
            const newOrderItem = {
                id: productID,
                name: products.find(product => product.id === parseInt(productID)).name,
                size: sizes.find(size => size.id === parseInt(sizeID)).name,
                color: colors.find(color => color.id === parseInt(colorID)).name,
                quantity: quantity
            };
            setOrderSummary([...orderSummary, newOrderItem]);
            document.getElementById('productID').value = 'Select Product';
            document.getElementById('sizeID').value = 'Select Size';
            document.getElementById('colorID').value = 'Select Color';
            document.getElementById('quantity').value = '';
        } else {
            handleValidation()
        }
    }

    const handleDeleteProduct = (id) => {
        const updatedOrderSummary = orderSummary.filter(item => item.id !== id);
        setOrderSummary(updatedOrderSummary);
    }

    const handleSubmitSalesOrder = async () => {
        const customerID = document.getElementById('customerID').value;
        const orderItems = orderSummary.map(item => ({
            product_id: item.id,
            size_id: sizes.find(size => size.name === item.size).id,
            color_id: colors.find(color => color.name === item.color).id,
            quantity: item.quantity
        }));

        const formData = new FormData();
        formData.append('customer_id', customerID);
        for (let i = 0; i < orderItems.length; i++) {
            const element = orderItems[i];            
            formData.append(`products[${i}][color_id]`, element.color_id);
            formData.append(`products[${i}][size_id]`, element.size_id);
            formData.append(`products[${i}][quantity]`, element.quantity);
            formData.append(`products[${i}][product_id]`, element.product_id);
        }

        try {
            const res = await axios.post(`${BASE_URL}orders`, formData, config);
            console.log('Sales Order submitted successfully:', res.data);
            window.location.href = '/sales-orders'; // Redirect to sales orders page
        } catch (err) {
            handleError()
        }
    };

    return (
        <React.Fragment>
            <ToastContainer />
            <Row>
                <Col>
                    <Card>
                        <Card.Header className='d-flex justify-content-between align-items-center'>
                            <Col>
                                <Card.Title as="h5">Create Sales Orders</Card.Title>
                                <p className='mb-3 mt-2'>Create a new sales order by selecting products and customer details</p>
                            </Col>
                        </Card.Header>
                        <Card.Body>
                            <Col>

                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <Card>
                                                <Card.Body className='p-3 pb-0'>
                                                    <h5>Customer Information</h5>
                                                    <Form.Group className="select-group mb-3" controlId="customerID">
                                                        <Form.Label>Select Customer</Form.Label>
                                                        <Form.Control as="select">
                                                            <option>Select Customer</option>
                                                            {customers.map((customer) => (
                                                                <option key={customer.id} value={customer.id}>{ }
                                                                    {customer.name}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card>

                                            <Card>
                                                <Card.Body className='p-3'>
                                                    <h5>Add Products</h5>
                                                    <Form.Group className="select-group mb-3" controlId="productID">
                                                        <Form.Label>Product Name</Form.Label>
                                                        <Form.Control as="select">
                                                            <option>Select Product</option>
                                                            {products.map((product) => (
                                                                <option key={product.id} value={product.id}>{product.name}</option>
                                                            ))}
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Group className="select-group mb-3" controlId="sizeID">
                                                                <Form.Label>Size</Form.Label>
                                                                <Form.Control as="select">
                                                                    <option>Select Size</option>
                                                                    {sizes.map((size) => (
                                                                        <option key={size.id} value={size.id}>{size.name}</option>
                                                                    ))}
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="select-group mb-3" controlId="colorID">
                                                                <Form.Label>Color</Form.Label>
                                                                <Form.Control as="select">
                                                                    <option>Select Color</option>
                                                                    {colors.map((color) => (
                                                                        <option key={color.id} value={color.id}>{color.name}</option>
                                                                    ))}
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-3" controlId="quantity">
                                                                <Form.Label>Quantity (Box)</Form.Label>
                                                                <Form.Control type="number" placeholder="Quantity" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={12}>
                                                            <Button className='w-100' variant="primary" onClick={handleAddToOrder}>
                                                                <span className='feather icon-plus me-2'></span>
                                                                Add to Order
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6}>
                                            <Card>
                                                <Card.Body className='p-3 pb-0'>
                                                    <h5>Order Summary</h5>
                                                    <Table responsive hover>
                                                        <thead>
                                                            <tr>
                                                                <th>Product</th>
                                                                <th>Size</th>
                                                                <th>Qty</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                orderSummary.map((item) => (
                                                                    <tr key={item.id}>
                                                                        <td>{item.name}</td>
                                                                        <td >{item.size}</td>
                                                                        <td >{item.quantity}</td>
                                                                        <td >
                                                                            <div className="d-flex gap-2 actions-btns">
                                                                                <span className="feather icon-trash-2 delete" onClick={() => handleDeleteProduct(item.id)}></span>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Card>
                                            <Card>
                                                <Card.Body className='p-3'>
                                                    <Row className='justify-content-between'>
                                                        <Col md={6}>
                                                            <p className='mb-0 dark-txt'>Total Items:</p>
                                                        </Col>
                                                        <Col className='text-end' md={6}>
                                                            <b className='dark-txt'>{orderSummary.length}</b>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                            <Col>
                                                <Button className='w-100' variant="success" disabled={orderSummary.length > 0 ? false : true} onClick={handleSubmitSalesOrder}>
                                                    <span className='feather icon-check me-2'></span>
                                                    Submit Sales Order
                                                </Button>
                                            </Col>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CreateSalesOrders;
