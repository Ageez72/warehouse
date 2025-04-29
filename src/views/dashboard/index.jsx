import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BASE_URL } from 'config/constant';
import axios from 'axios';

// const dashSalesData = [
//   { title: 'Daily Sales', amount: '$249.95', icon: 'icon-arrow-up text-c-green', value: 50, class: 'progress-c-theme' },
//   { title: 'Monthly Sales', amount: '$2.942.32', icon: 'icon-arrow-down text-c-red', value: 36, class: 'progress-c-theme2' },
//   { title: 'Yearly Sales', amount: '$8.638.32', icon: 'icon-arrow-up text-c-green', value: 70, color: 'progress-c-theme' }
// ];

const DashDefault = () => {
  const [dashSalesData, setDashSalesData] = useState([]);

  const token = localStorage.getItem('token');
  const headers = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  // Fetch all lines
  const getLines = async () => {
    try {
      const response = await axios.get(`${BASE_URL}home`, headers);
      setDashSalesData(response.data.data);
    } catch (error) {
      console.error('Error fetching lines:', error);
    }
  };

  useEffect(() => {
    getLines();
  }
    , []);
  return (
    <React.Fragment>
      <Row>
        <Col xl={3} xxl={3}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Docks</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className={`feather icon-arrow-up ${dashSalesData.docks > 0 ? 'text-c-green' : 'text-c-red'} f-30 m-r-5`} /> {dashSalesData.docks}
                  </h3>
                </div>
                <div className="col-3 text-end">
                  <p className="m-b-0">{dashSalesData.docks}%</p>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className={`progress-bar icon-arrow-up text-c-green`}
                  role="progressbar"
                  style={{ width: `${dashSalesData.docks}%` }}
                  aria-valuenow={dashSalesData.docks}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} xxl={3}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Sales Orders</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className={`feather icon-arrow-up ${dashSalesData.orders > 0 ? 'text-c-green' : 'text-c-red'} f-30 m-r-5`} /> {dashSalesData.orders}
                  </h3>
                </div>
                <div className="col-3 text-end">
                  <p className="m-b-0">{dashSalesData.orders}%</p>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className={`progress-bar icon-arrow-up text-c-green`}
                  role="progressbar"
                  style={{ width: `${dashSalesData.orders}%` }}
                  aria-valuenow={dashSalesData.orders}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} xxl={3}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Pallets</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className={`feather icon-arrow-up ${dashSalesData.pallets > 0 ? 'text-c-green' : 'text-c-red'} f-30 m-r-5`} /> {dashSalesData.pallets}
                  </h3>
                </div>
                <div className="col-3 text-end">
                  <p className="m-b-0">{dashSalesData.pallets}%</p>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className={`progress-bar icon-arrow-up text-c-green`}
                  role="progressbar"
                  style={{ width: `${dashSalesData.pallets}%` }}
                  aria-valuenow={dashSalesData.pallets}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} xxl={3}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Production Orders</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className={`feather icon-arrow-up ${dashSalesData.productions > 0 ? 'text-c-green' : 'text-c-red'} f-30 m-r-5`} /> {dashSalesData.productions}
                  </h3>
                </div>
                <div className="col-3 text-end">
                  <p className="m-b-0">{dashSalesData.productions}%</p>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className={`progress-bar icon-arrow-up text-c-green`}
                  role="progressbar"
                  style={{ width: `${dashSalesData.productions}%` }}
                  aria-valuenow={dashSalesData.productions}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
