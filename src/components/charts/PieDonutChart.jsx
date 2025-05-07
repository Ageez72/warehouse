// DonutChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ chartData, chartOptions }) => {
  return (
    <div className="w-full max-w-md mx-auto" style={{ height: '400px', display: 'flex', justifyContent: 'center' }}>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default DonutChart;
