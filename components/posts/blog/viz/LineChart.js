import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ dataUrl, xKey, yKey }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(dataUrl);
      const data = await response.json();
      console.log("Fetched Data: ", data); // Debugging line  
      
      setChartData({
        labels: data.map(item => item[xKey]),
        datasets: [{
          label: '', // Label is set to an empty string
          data: data.map(item => Number(item[yKey])),
          fill: false,
          borderColor: '#c0d6df',
          tension: 0.5
        }]
      });

      setChartOptions({
        plugins: {
          legend: {
            display: false // This will hide the legend
          }
        }
      });
    };

    fetchData();
  }, [dataUrl, xKey, yKey]);

  return (
    <div>
      {chartData.datasets ? <Line data={chartData} options={chartOptions} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default LineChart;
