import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

const WarehouseInventory = () => {

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Inventory Status</Card.Title>
            </Card.Header>
            <Card.Body className='p-0'>
              <div className="table-card">
                <Table className='mb-0' responsive hover>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Size</th>
                      <th>Total Pallets</th>
                      <th>Total Boxes</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <span className="feather icon-layers me-2"></span>
                        <span>Cardboard Boxes</span>
                      </th>
                      <td>Large</td>
                      <td>
                        <span className="feather icon-inbox me-2"></span>
                        <span>24</span>
                      </td>
                      <td>
                        <span className="feather icon-box me-2"></span>
                        <span>240</span>
                      </td>
                      <td>
                        <span className="badge bg-success">In Stock</span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default WarehouseInventory;
