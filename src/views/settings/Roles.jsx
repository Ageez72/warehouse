import React, { useState, useContext } from 'react';
import { BASE_URL } from 'config/constant';
import axios from 'axios';
import { Row, Col, Card, Table, Form, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';
import { ConfigContext } from 'contexts/ConfigContext';
const Roles = () => {
  const configContext = useContext(ConfigContext);
  const { roleID } = configContext.state;
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
  console.log(configContext.state);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className='d-flex justify-content-between align-items-center'>
              <Card.Title as="h5">Roles</Card.Title>
              <Button variant="primary" onClick={() => handleAddShow(false)}>
                Add Role
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Role Name</th>
                    <th>Permession</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roleID?.map((role) => (
                    <tr key={role.id}>
                      <th scope="row">1</th>
                      <td>{role.name}</td>
                      <td>{role.permissions}</td>
                      <td>
                        <div className="d-flex gap-2 actions-btns">
                          <span className="feather icon-edit edit" onClick={() => handleAddShow(true, role)}></span>
                          <span className="feather icon-trash-2 delete" onClick={()=> handleDeleteShow(role)}></span>
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

      <Modal show={showAdd} onHide={handleAddClose} centered >
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Edit" : "Add"} Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" disabled={edit} />
                </Form.Group>
                <Form.Group className="select-group mb-3" controlId="exampleForm.roleID">
                  <Form.Label>Role ID</Form.Label>
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
          <Modal.Title>Delete Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this role?
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

export default Roles;
