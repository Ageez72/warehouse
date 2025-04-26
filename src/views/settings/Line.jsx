import React, { useState } from 'react';
import { Row, Col, Card, Table, Form, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';

const Line = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);

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

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className='d-flex justify-content-between align-items-center'>
              <Card.Title as="h5">Lines</Card.Title>
              <Button variant="primary" onClick={()=> handleAddShow(false)}>
                Add Line
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Line Name</th>
                    <th>Warehouse ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>
                      <div className="d-flex gap-2 actions-btns">
                        <span className="feather icon-edit edit" onClick={()=> handleAddShow(true)}></span>
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

      <Modal show={showAdd} onHide={handleAddClose} centered >
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Edit": "Add"} Line</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Line Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" disabled={edit} />
                </Form.Group>
                <Form.Group className="select-group mb-3" controlId="exampleForm.roleID">
                  <Form.Label>Warehouse ID</Form.Label>
                  <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
              </Col>
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
          <Modal.Title>Delete Line</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this line?
          </p>
          <strong className='danger-txt' style={{fontWeight: `700`}}>Note:</strong> This action cannot be undone.
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

export default Line;
