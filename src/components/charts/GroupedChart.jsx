// BarChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ chartData, chartOptions }) => {
  return (
    <div className="w-full max-w-md mx-auto" style={{ height: '400px' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
