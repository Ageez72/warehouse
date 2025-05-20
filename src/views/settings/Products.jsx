import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Form, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';
import { BASE_URL } from 'config/constant';
import axios from 'axios';

const Products = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [lines, setLines] = useState([]);
  const [products, setProducts] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    warehouses: []
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  // Fetch all lines
  const getLines = async (id) => {
    try {
      if(id){
        const response = await axios.get(`${BASE_URL}lines?warehouse_id=${id}`, headers);
        setLines(response.data.data);
      }else {
        setLines([])
      }
    } catch (error) {
      console.error('Error fetching lines:', error);
    }
  };

  // Fetch warehouses for dropdown
  const getWarehouses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}warehouses`, headers);
      setWarehouses(response.data.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  useEffect(() => {
    getWarehouses();
    // getLines();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}products`, headers);
      setProducts(res.data.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWarehouseChange = (index, field, value) => {
    const updated = [...formData.warehouses];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, warehouses: updated });
    if(field === "warehouse_id"){
      getLines(value);
    }
  };

  const addWarehouseRow = () => {
    const lastItem = formData.warehouses[formData.warehouses.length - 1];
  
    // If there's no item yet OR last item is filled, allow adding new one
    if (!lastItem || (lastItem.warehouse_id && lastItem.line_id)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        warehouses: [
          ...prevFormData.warehouses,
          { warehouse_id: '', line_id: '' }
        ],
      }));
    } else {
      alert('Please fill in the previous warehouse and line before adding a new one');
    }
  };
  

  const removeWarehouseRow = (index) => {
    const updated = [...formData.warehouses];
    updated.splice(index, 1);
    setFormData({ ...formData, warehouses: updated });
  };

  const resetForm = () => {
    setFormData({ name: '', code: '', warehouses: [] });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('code', formData.code);

    formData.warehouses.forEach((item, index) => {
      data.append(`warehouses[${index}][warehouse_id]`, item.warehouse_id);
      data.append(`warehouses[${index}][line_id]`, item.line_id);
    });

    try {
      if (editingId) {
        data.append('_method', 'put');
        await axios.post(`${BASE_URL}products/${editingId}`, data, headers);
      } else {
        await axios.post(`${BASE_URL}products`, data, headers);
      }
      fetchProducts();
      resetForm();
      setShowAdd(false);
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleEdit = (product) => {
    console.log(product);
    
    setEditingId(product.id);
    setFormData({
      name: product.name,
      code: product.code,
      warehouses: product.product_lines || []
    });
  };
  const confirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}products/${deleteProductId}`, headers);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    } finally {
      setShowDelete(false);
      setDeleteProductId(null);
    }
  };
  
  const handleDelete = async (id) => {
    setDeleteProductId(id);
    setShowDelete(true);
  };

  const handleAddShow = (editSatus) => {
    setShowAdd(true);
    setEdit(editSatus);
  };

  const handleAddClose = () => {
    resetForm();
    setShowAdd(false);
    setEdit(false);
  };



  const handleDeleteClose = () => setShowDelete(false);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className='d-flex justify-content-between align-items-center'>
              <Card.Title as="h5">Products</Card.Title>
              <Button variant="primary" onClick={() => handleAddShow(false)}>
                Add Product
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Code</th>
                    <th>Product Name</th>
                    <th>Warhouse</th>
                    <th>Line</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{product.code}</td>
                      <td>{product.name}</td>
                      <td>{product.product_lines?.map(w => w.warehouse.name).join(', ')}</td>
                      <td>{product.product_lines?.map(w => w.line.name).join(', ')}</td>
                      <td>
                        <div className="d-flex gap-2 actions-btns">
                          <span className="feather icon-edit edit" onClick={() => { handleEdit(product); handleAddShow(true); }}></span>
                          <span className="feather icon-trash-2 delete" onClick={() => handleDelete(product.id)}></span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showAdd} onHide={handleAddClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Edit" : "Add"} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={12}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                      <Form.Label>Code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter code"
                        name="code"
                        value={formData.code}
                        onChange={handleInputChange}
                        disabled={edit}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control type="text"
                        placeholder="Enter product name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={12}>
                <span className="feather icon-plus-circle" onClick={addWarehouseRow}></span>
              </Col>

              {/* extra items */}
              {formData.warehouses.map((item, index) => (
                <Col md={12} key={index}>
                  <Row className='align-items-center'>
                    <Col md={5}>
                      <Form.Group className="select-group mb-3">
                        <Form.Label>Warehouse ID</Form.Label>
                        <Form.Control
                          as="select"
                          value={item.warehouse_id}
                          onChange={(e) => handleWarehouseChange(index, 'warehouse_id', e.target.value)}
                        >
                          <option value="">Select warehouse</option>
                          {warehouses.map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.id}>
                              {warehouse.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={5}>
                      <Form.Group className="select-group mb-3">
                        <Form.Label>Line ID</Form.Label>
                        <Form.Control
                          as="select"
                          value={item.line_id}
                          onChange={(e) => handleWarehouseChange(index, 'line_id', e.target.value)}
                        >
                          <option value="">Select Line ID</option>
                          {lines.map((line) => (
                            <option key={line.id} value={line.id}>
                              {line.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={2} className='text-center'>
                      <span className="feather icon-x-circle danger-txt" onClick={() => removeWarehouseRow(index)}></span>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleDeleteClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this Product?
          </p>
          <strong className='danger-txt' style={{ fontWeight: `700` }}>Note:</strong> This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


    </React.Fragment>
  );
};

export default Products;
