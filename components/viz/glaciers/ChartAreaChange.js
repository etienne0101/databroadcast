import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import glaciers from '../../../data/glaciers/glaciers-20230814.json';
import glaciersPrev from '../../../data/glaciers/glaciers-20230801.json';

const ChartAreaChange = () => {
  const [chartData, setChartData] = useState([]);

  const compareGlacierSize = () => {
    const data = [];

    glaciers.forEach(glacier => {
      const glacierPrev = glaciersPrev.find(g => g.itemLabel === glacier.itemLabel);

      if (glacierPrev && glacierPrev.area_sqkm !== null && glacier.area_sqkm !== null) {
        const diff = glacierPrev.area_sqkm - glacier.area_sqkm;
        if (diff > 0) {
          data.push({
            name: glacier.itemLabel,
            SizeChange: -parseFloat(diff.toFixed(2)),
            fill: '#bde0fe'
          });
        }
      }
    });

    setChartData(data);
  }

  useEffect(() => {
    compareGlacierSize();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <BarChart
        width={800}
        height={500}
        data={chartData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis orientation="right" />
        <Tooltip />
        <Legend />
        <Bar dataKey="SizeChange" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default ChartAreaChange;
