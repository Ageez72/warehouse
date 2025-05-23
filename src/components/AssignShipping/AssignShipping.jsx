import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from 'config/constant';
import { Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer } from 'react-toastify';
import { showToast } from 'components/ToastNotifier/ToastNotifier';

const handleAdd = () => showToast('success', 'add');
const handleSubmitError = () => showToast('submitError', 'submitError');
const handleValidation = () => showToast('info', 'validation');

const AssignShipping = ({ list, onAssign }) => {
    const [salesOrder, setSalesOrder] = useState("");
    const [dockNumber, setDockNumber] = useState("");
    const [scheduleTime, setScheduleTime] = useState(null);

    const resetForm = () => {
        setSalesOrder("")
        setDockNumber("")
        setScheduleTime(null)
    }

    function formatToYMDHI(isoString) {
        const date = new Date(isoString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const handleAssignShipping = async () => {

        if(!salesOrder || !dockNumber || !scheduleTime){
            handleValidation();
            return;
        }
        const data = {
            order_id: salesOrder,
            name: dockNumber,
            time: formatToYMDHI(scheduleTime)
        };
        try {
            const response = await axios.post(`${BASE_URL}docks`, data, config);
            if (response.status === 200) {
                onAssign();
                handleAdd()
                resetForm()
            } else {
                handleSubmitError()
            }
        } catch (error) {
            handleSubmitError()
        }
    }

    return (
        <>
        <Form className="dock-form">
            <Row className='align-items-end'>
                <Col md={3}>
                    <Form.Group className="select-group mb-3" controlId="salesOrder">
                        <Form.Label>Sales Order</Form.Label>
                        <Form.Control as="select" value={salesOrder} onChange={(e) => setSalesOrder(e.target.value)}>
                            <option>Select Sales Order</option>
                            {
                                list?.data?.map((item, index) => (
                                    <option key={index} value={item.id}>{item.code}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="select-group mb-3" controlId="loadingDock">
                        <Form.Label>Loading Dock</Form.Label>
                        <Form.Control as="select" value={dockNumber} onChange={(e) => setDockNumber(e.target.value)}>
                            <option value="">Select Dock</option>
                            <option value="dock1">Dock 1</option>
                            <option value="dock2">Dock 2</option>
                            <option value="dock3">Dock 3</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3 dateTimeInput" controlId="scheduleTime">
                        <Form.Label>Schedule Time</Form.Label>
                        <br />
                        <DatePicker
                            selected={scheduleTime}
                            onChange={(date) => setScheduleTime(date)}
                            showTimeSelect
                            dateFormat="yyyy/MM/dd h:mm aa"
                            className="form-control"
                            placeholderText="Select Schedule time"
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Button className='w-100 mb-3' variant="success" onClick={handleAssignShipping}>
                        <span className='feather icon-calendar me-2'></span>
                        Assign Shipping
                    </Button>
                </Col>
            </Row>
        </Form>

        <ToastContainer/>
        </>
    );
}

export default AssignShipping;