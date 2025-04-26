import React, { useState } from 'react';
import { Row, Col, Card, Table, Form, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';

const Products = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [extraItems, setExtraItems] = useState([]);

  const handleAddShow = (editSatus) => {
    setShowAdd(true);
    setEdit(editSatus);
  };

  const handleAddClose = () => {
    setShowAdd(false);
    setEdit(false);
  };

  
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);


  const handleAddExtraItems = () => {
    if (extraItems.length > 0) {
      const lastItem = extraItems[extraItems.length - 1];
      if (!lastItem.warehouseId || !lastItem.lineId) {
        alert("Please fill the previous extra item before adding a new one.");
        return;
      }
    }
  
    setExtraItems([...extraItems, { warehouseId: '', lineId: '' }]);
  };
  

  const handleExtraItemChange = (index, field, value) => {
    const updatedItems = [...extraItems];
    updatedItems[index][field] = value;
    setExtraItems(updatedItems);
  };

  const handleDeleteExtraItem = (index) => {
    const updatedItems = [...extraItems];
    updatedItems.splice(index, 1);
    setExtraItems(updatedItems);
  };


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
                    <th>Warhouse ID</th>
                    <th>Line ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>@mdo</td>
                    <td>Mark</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <div className="d-flex gap-2 actions-btns">
                        <span className="feather icon-edit edit" onClick={() => handleAddShow(true)}></span>
                        <span className="feather icon-trash-2 delete" onClick={handleDeleteShow}></span>
                      </div>
                    </td>
                  </tr>
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
                      <Form.Control type="text" placeholder="Enter code" disabled={edit} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter product name" />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={12}>
                <span className="feather icon-plus-circle" onClick={handleAddExtraItems}></span>
              </Col>

              {/* extra items */}
              {extraItems.map((item, index) => (
                <Col md={12} key={index}>
                  <Row className='align-items-center'>
                    <Col md={5}>
                      <Form.Group className="select-group mb-3">
                        <Form.Label>Warehouse ID</Form.Label>
                        <Form.Control
                          as="select"
                          value={item.warehouseId}
                          onChange={(e) => handleExtraItemChange(index, 'warehouseId', e.target.value)}
                        >
                          <option value="">Select Warehouse ID</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={5}>
                      <Form.Group className="select-group mb-3">
                        <Form.Label>Line ID</Form.Label>
                        <Form.Control
                          as="select"
                          value={item.lineId}
                          onChange={(e) => handleExtraItemChange(index, 'lineId', e.target.value)}
                        >
                          <option value="">Select Line ID</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={2} className='text-center'>
                      <span className="feather icon-x-circle danger-txt" onClick={() => handleDeleteExtraItem(index)}></span>
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
          <Button variant="primary" onClick={handleAddClose}>
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
          <Button variant="danger" onClick={handleDeleteClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


    </React.Fragment>
  );
};

export default Products;
