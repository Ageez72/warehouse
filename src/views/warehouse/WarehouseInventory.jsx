import React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from 'config/constant';
const WarehouseInventory = () => {
  const [warehouseList, setWarehouseList] = useState([]);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

    const getWarehouseList = async () => {
      try {
        const response = await axios.get(`${BASE_URL}inventory `, config);
        setWarehouseList(response.data.data);
      } catch (error) {
        console.error('Error fetching Warehouse List:', error);
      }
    };

    useEffect(() => {
      getWarehouseList();
    }, []);

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
                    </tr>
                  </thead>
                  <tbody>
                    {
                      warehouseList.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">
                            <span className="feather icon-layers me-2"></span>
                            <span>{item.production.product.name}</span>
                          </th>
                          <td>{item.production.size.name}</td>
                          <td>
                            <span className="feather icon-inbox me-2"></span>
                            <span>{item.total_pallets}</span>
                          </td>
                          <td>
                            <span className="feather icon-box me-2"></span>
                            <span>{item.total_bxes}</span>
                          </td>
                        </tr>
                      ))
                    }
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
