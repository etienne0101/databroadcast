import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PlotChart = ({ dataUrl, xKey, yKey, plotLabel, colorKey }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const assignColor = (value, colorMap) => {
    if (!colorMap[value]) {
      // Use hsla format to include opacity
      colorMap[value] = `hsla(${Object.keys(colorMap).length * 500.00}, 60%, 60%, 0.5)`;
    }
    return colorMap[value];
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(dataUrl);
      let data = await response.json();

      let colorMap = {};
      let datasets = {};

      data.forEach(item => {
        const colorValue = item[colorKey];
        const color = assignColor(colorValue, colorMap);

        if (!datasets[colorValue]) {
          datasets[colorValue] = {
            label: colorValue,
            data: [],
            backgroundColor: color
          };
        }

        datasets[colorValue].data.push({
          x: Number(item[xKey]),
          y: Number(item[yKey]),
          additionalLabel: item[plotLabel]
        });
      });

      setChartData({
        datasets: Object.values(datasets)
      });
    };

    fetchData();

    setChartOptions({
      scales: {
        x: {
          title: {
            display: true,
            text: xKey.replace(/_/g, ' ')
          }
        },
        y: {
          title: {
            display: true,
            text: yKey.replace(/_/g, ' ')
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label;
              const additionalLabel = context.raw.additionalLabel || '';
              return `${label} - ${plotLabel}: ${additionalLabel}`;
            }
          }
        }
      }
    });
  }, [dataUrl, xKey, yKey, plotLabel, colorKey]);

  return (
    <div>
      {chartData.datasets ? (
        <Scatter data={chartData} options={chartOptions} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default PlotChart;
