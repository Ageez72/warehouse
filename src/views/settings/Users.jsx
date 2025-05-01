import React, { useContext, useState, useEffect } from 'react';
import { BASE_URL } from 'config/constant';
import { ConfigContext } from 'contexts/ConfigContext';
import axios from 'axios';
import { Row, Col, Card, Table, Form, Button, Modal } from 'react-bootstrap';

const Users = () => {
  const configContext = useContext(ConfigContext);
  const { roleID } = configContext.state;
  const [users, setUsers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null); // Track the user to delete

  const handleAddShow = (editStatus, user) => {
    setShowAdd(true);
    setEdit(editStatus);
    setCurrentUser(user);
  };

  const handleAddClose = () => {
    setShowAdd(false);
    setEdit(false);
    setCurrentUser(null);
  };

  const handleDeleteClose = () => setShowDelete(false);

  const handleDeleteShow = (user) => {
    setUserToDelete(user);
    setShowDelete(true);
  };

  const usersUrl = `${BASE_URL}users`;

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(usersUrl, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.error('User is not authenticated');
        } else {
          console.error("There was an error fetching the users!", error);
        }
      });
  }, []);

  const handleSave = () => {
    const token = localStorage.getItem('token');
    const url = edit
      ? `${BASE_URL}users/${currentUser.id}`  // Use PUT for editing
      : `${BASE_URL}users`;  // Use POST for adding

    const userData = {
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      password: currentUser.password,
      role_id: currentUser.role_id,
    };

    if(edit) {
      userData._method = "put"
    }

    // Make the API call to edit or add the user
    axios
      .request({
        method:'post',  // Use PUT or POST based on the edit flag
        url: url,
        data: userData,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(() => {
        if (edit) {
          // For editing, manually update the user's data in the state
          const updatedUsers = users.map((user) =>
            user.id === currentUser.id
              ? { ...user, name: currentUser.name, email: currentUser.email, phone: currentUser.phone, role_id: currentUser.role_id }
              : user
          );
          console.log('Updated Users:', updatedUsers);
          setUsers(updatedUsers);
        } else {
          // For adding, prepend the new user to the users array
          const newUser = {
            id: Date.now(), // Temporarily using Date.now() as a new ID, adjust if needed
            name: currentUser.name,
            email: currentUser.email,
            phone: currentUser.phone,
            role_id: currentUser.role_id,
          };
          setUsers([newUser, ...users]);
        }
        handleAddClose();
        location.reload();
      })
      .catch((error) => {
        console.error('Error saving user!', error);
      });
  };


  // Handle the delete request
  const handleDelete = () => {
    const token = localStorage.getItem('token');
    if (!userToDelete) return;

    axios.delete(`${BASE_URL}users/${userToDelete.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    })
      .then(() => {
        // Update the users state by removing the deleted user
        const updatedUsers = users.filter(user => user.id !== userToDelete.id);
        setUsers(updatedUsers);
        setShowDelete(false); // Close the delete modal
      })
      .catch((error) => {
        console.error("Error deleting user!", error);
      });
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header className='d-flex justify-content-between align-items-center'>
              <Card.Title as="h5">Users</Card.Title>
              <Button variant="primary" onClick={() => handleAddShow(false, null)}>
                Add User
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user?.role?.name}</td>
                        <td>{user.phone}</td>
                        <td>
                          <div className="d-flex gap-2 actions-btns">
                            <span className="feather icon-edit edit" onClick={() => handleAddShow(true, user)}></span>
                            <span className="feather icon-trash-2 delete" onClick={() => handleDeleteShow(user)}></span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No users available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showAdd} onHide={handleAddClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Edit" : "Add"} User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentUser?.name || ''}
                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={currentUser?.email || ''}
                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="number"
                    value={currentUser?.phone || ''}
                    onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={currentUser?.password || ''}
                    onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="select-group mb-3" controlId="roleID">
                  <Form.Label>Role ID</Form.Label>
                  <Form.Control
                    as="select"
                    value={currentUser?.role_id || ''}
                    onChange={(e) => setCurrentUser({ ...currentUser, role_id: e.target.value })}
                  >
                    <option value="">Select Role</option>
                    {roleID?.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
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
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleDeleteClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user?</p>
          <strong className='danger-txt' style={{ fontWeight: '700' }}>
            Note: This action cannot be undone.
          </strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Users;
