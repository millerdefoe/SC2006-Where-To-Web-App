import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import "../styles/PredictedCarParkAvail.css";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const PredictedCarParkAvail = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const dummyData = [
      { timestamp: Date.now(), availability: 50 },
      { timestamp: Date.now() + 15 * 60 * 1000, availability: 45 },
      { timestamp: Date.now() + 30 * 60 * 1000, availability: 40 },
      { timestamp: Date.now() + 45 * 60 * 1000, availability: 38 },
      { timestamp: Date.now() + 60 * 60 * 1000, availability: 35 },
      { timestamp: Date.now() + 75 * 60 * 1000, availability: 33 },
      { timestamp: Date.now() + 90 * 60 * 1000, availability: 30 },
      { timestamp: Date.now() + 105 * 60 * 1000, availability: 25 },
      { timestamp: Date.now() + 120 * 60 * 1000, availability: 20 },
      { timestamp: Date.now() + 135 * 60 * 1000, availability: 18 },
      { timestamp: Date.now() + 150 * 60 * 1000, availability: 15 },
      { timestamp: Date.now() + 165 * 60 * 1000, availability: 12 },
      { timestamp: Date.now() + 180 * 60 * 1000, availability: 20 },
      { timestamp: Date.now() + 195 * 60 * 1000, availability: 8 },
      { timestamp: Date.now() + 210 * 60 * 1000, availability: 0 },
      { timestamp: Date.now() + 225 * 60 * 1000, availability: 2 },
      { timestamp: Date.now() + 240 * 60 * 1000, availability: 11 }
    ];
    const timeLabels = dummyData.map(item => new Date(item.timestamp).toLocaleTimeString());
    const availabilityValues = dummyData.map(item => item.availability);

    setData({
      labels: timeLabels,
      datasets: [
        {
          label: 'Car Park Availability',
          data: availabilityValues,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1
        }
      ]
    });
  }, []);

  if (!data) {
    return <p>Loading graph...</p>;
  }

  // Chart.js configuration with custom tooltips
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          // Custom tooltip to show the car park availability and time
          label: function (tooltipItem) {
            const time = tooltipItem.label; // Get the time (x-axis label)
            const availability = tooltipItem.raw; // Get the availability value (y-axis value)
            return `${time}: ${availability} lots available`;
          }
        }
      }
    }
  };

  return (
    <div>
      <h2>Predicted Car Park Availability for the Next 24 Hours</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default PredictedCarParkAvail;