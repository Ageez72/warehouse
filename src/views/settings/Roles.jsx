import React, { useState, useEffect, useContext } from 'react';
import { BASE_URL } from 'config/constant';
import axios from 'axios';
import { Row, Col, Card, Table, Form, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { ConfigContext } from 'contexts/ConfigContext';
import * as actionType from 'store/actions';

const Roles = () => {
  const configContext = useContext(ConfigContext);
  const { roleID } = configContext.state;
  const { dispatch } = configContext;
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    axios.get(`${BASE_URL}permissions`, config)
      .then((response) => {
        setPermissions(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching permissions:', error);
      });
  }, []);

  const handleAddShow = (editStatus, role = null) => {
    setEdit(editStatus);
    setSelectedRole(role);
    setRoleName(role?.name || '');
    setSelectedPermissions(
      role?.permissions?.map(p => ({ value: p.id, label: p.name })) || []
    );
    setShowAdd(true);
  };

  const handleAddClose = () => {
    setShowAdd(false);
    setEdit(false);
    setRoleName('');
    setSelectedRole(null);
    setSelectedPermissions([]);
  };

  const handleDeleteShow = (role) => {
    setRoleToDelete(role);
    setShowDelete(true);
  };

  const handleDeleteClose = () => {
    setRoleToDelete(null);
    setShowDelete(false);
  };

  const handleSaveRole = async () => {
    const formData = new FormData();
    formData.append('name', roleName);

    selectedPermissions.forEach((perm, index) => {
      formData.append(`permissions[${index}]`, perm.value);
    });

    if (edit && selectedRole) {
      formData.append('_method', 'put');
    }

    try {
      const url = edit && selectedRole
        ? `${BASE_URL}roles/${selectedRole.id}`
        : `${BASE_URL}roles`;

      const response = await axios.post(url, formData, config);
      dispatch({ type: actionType.ROLE_ID, payload: response.data.data });
      handleAddClose();
      location.reload();
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };


  const handleConfirmDelete = async () => {
    try {
      if (roleToDelete) {
        const response = await axios.delete(`${BASE_URL}roles/${roleToDelete.id}`, config);
        dispatch({ type: actionType.ROLE_ID, payload: response.data.data });
      }
      handleDeleteClose();
      location.reload();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const permissionOptions = permissions.map(p => ({ value: p.id, label: p.name }));

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
                    <th>Permissons</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roleID?.map((role, index) => (
                    <tr key={role.id}>
                      <td>{index + 1}</td>
                      <td>{role.name}</td>
                      <td>{role?.permissions[0]?.name}</td>
                      <td>
                        <div className="d-flex gap-2 actions-btns">
                          <span className="feather icon-edit edit text-primary cursor-pointer" onClick={() => handleAddShow(true, role)}></span>
                          <span className="feather icon-trash-2 delete text-danger cursor-pointer" onClick={() => handleDeleteShow(role)}></span>
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

      {/* Add/Edit Modal */}
      <Modal show={showAdd} onHide={handleAddClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? 'Edit Role' : 'Add Role'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Permissions</Form.Label>
              <Select
                options={permissionOptions}
                isMulti
                value={selectedPermissions}
                onChange={setSelectedPermissions}
                placeholder="Select Permissions"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveRole}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDelete} onHide={handleDeleteClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this role?</p>
          <strong className="danger-txt" style={{ fontWeight: '700' }}>
            Note:
          </strong>{' '}
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Roles;
