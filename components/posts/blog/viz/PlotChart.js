import React, { useEffect, useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register the components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const PlotChart = ({ dataUrl, xKey, yKey, plotLabel }) => {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(dataUrl)
      let data = await response.json()

      if (!Array.isArray(data)) {
        console.error('Data is not an array:', data)
        data = []
      }

      setChartData({
        datasets: [
          {
            label: 'Scatter Dataset',
            data: data.map((item) => ({
              x: Number(item[xKey]),
              y: Number(item[yKey]),
              additionalLabel: item[plotLabel] // Include the additional label in the data point
            })),
            backgroundColor: '#c0d6df'
          }
        ]
      })
      
      // Update chart options with dynamic axis titles
      setChartOptions({
        scales: {
          x: {
            title: {
              display: true,
              text: xKey.replace(/_/g, ' ') // Replaces underscores with spaces for readability
            }
          },
          y: {
            title: {
              display: true,
              text: yKey.replace(/_/g, ' ') // Replaces underscores with spaces for readability
            }
          }
        },
        plugins: {
          legend: {
            display: false,
            position: 'top'
          },
          title: {
            display: false,
            text: 'Chart Title' // You can also dynamically set this if needed
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const additionalLabel = context.raw.additionalLabel || ''; // Access the additional label
                return `${plotLabel}: ${additionalLabel}`;
              }
            }
          }
        }
      })
    }
    fetchData()
  }, [dataUrl, xKey, yKey, plotLabel])

  return (
    <div>
      {chartData.datasets ? (
        <Scatter data={chartData} options={chartOptions} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  )
}

export default PlotChart