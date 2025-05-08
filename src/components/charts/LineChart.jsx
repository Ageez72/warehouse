// LineChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ chartData, chartOptions }) => {
  return (
    <div className="w-full max-w-md mx-auto" style={{ minHeight: '400px' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
