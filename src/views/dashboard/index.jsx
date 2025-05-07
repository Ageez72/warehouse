import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BASE_URL } from 'config/constant';
import BarChart from 'components/charts/GroupedChart';
import DonutChart from 'components/charts/PieDonutChart';
import axios from 'axios';
const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Sales',
      data: [150, 200, 170, 220, 300],
      backgroundColor: '#04a9f5' // blue
    },
    {
      label: 'Expenses',
      data: [120, 180, 140, 200, 280],
      backgroundColor: '#f44236' // red
    },
    {
      label: 'Profit',
      data: [30, 20, 30, 20, 20],
      backgroundColor: '#1de9b6' // green
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Monthly Sales vs Expenses vs Profit'
    }
  }
};

const data2 = {
  labels: ['Marketing', 'Development', 'Operations', 'Support'],
  datasets: [
    {
      label: 'Department Budget',
      data: [300, 500, 200, 100],
      backgroundColor: ['#04a9f5', '#1de9b6', '#F59E0B', '#f44236'],
      hoverOffset: 10
    }
  ]
};

const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Budget Allocation (Donut Chart)'
    }
  },
  cutout: '60%' // this creates the "donut" hole
};

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
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Production Performance</Card.Title>
            </Card.Header>
            <Card.Body className="text-center">
            <BarChart chartData={data} chartOptions={options} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Pallets Chart</Card.Title>
            </Card.Header>
            <Card.Body className="text-center">
            <DonutChart chartData={data2} chartOptions={options2} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card className="Recent-Users widget-focus-lg">
            <Card.Header>
              <Card.Title as="h5">Recent Orders</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover className="recent-users">
                <tbody>
                  <tr className="unread">
                    <td>
                      <h5 className="mb-2 text-bold">Isabella Christensen</h5>
                      <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        11 MAY 12:56
                      </h6>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <h5 className="mb-2 text-bold">Mathilde Andersen</h5>
                      <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-red f-10 m-r-15" />
                        11 MAY 10:35
                      </h6>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <h5 className="mb-2 text-bold">Karla Sorensen</h5>
                      <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />9 MAY 17:38
                      </h6>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <h5 className="mb-2 text-bold">Ida Jorgensen</h5>
                      <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                    </td>
                    <td>
                      <h6 className="text-muted f-w-300">
                        <i className="fa fa-circle text-c-red f-10 m-r-15" />
                        19 MAY 12:56
                      </h6>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <h5 className="mb-2 text-bold">Albert Andersen</h5>
                      <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        21 July 12:56
                      </h6>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
