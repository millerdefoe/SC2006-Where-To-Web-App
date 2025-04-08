import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom"; 
import "../styles/PredictedCarParkAvail.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin 
);

const PredictedCarParkAvail = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const now = Date.now();
    const dummyData = [
      { timestamp: now, availability: 70 },
      { timestamp: now + 15 * 60 * 1000, availability: 45 },
      { timestamp: now + 30 * 60 * 1000, availability: 40 },
      { timestamp: now + 45 * 60 * 1000, availability: 38 },
      { timestamp: now + 60 * 60 * 1000, availability: 35 },
      { timestamp: now + 75 * 60 * 1000, availability: 33 },
      { timestamp: now + 90 * 60 * 1000, availability: 30 },
      { timestamp: now + 105 * 60 * 1000, availability: 25 },
      { timestamp: now + 120 * 60 * 1000, availability: 20 },
      { timestamp: now + 135 * 60 * 1000, availability: 18 },
      { timestamp: now + 150 * 60 * 1000, availability: 15 },
      { timestamp: now + 165 * 60 * 1000, availability: 12 },
      { timestamp: now + 180 * 60 * 1000, availability: 20 },
      { timestamp: now + 195 * 60 * 1000, availability: 8 },
      { timestamp: now + 210 * 60 * 1000, availability: 0 },
      { timestamp: now + 225 * 60 * 1000, availability: 2 },
      { timestamp: now + 240 * 60 * 1000, availability: 11 }
    ];

    const timeLabels = dummyData.map(item =>
      new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    const availabilityValues = dummyData.map(item => item.availability);

    setData({
      labels: timeLabels,
      datasets: [
        {
          label: "Car Park Availability",
          data: availabilityValues,
          backgroundColor: "rgba(0, 183, 255, 0.7)",
          borderWidth: 1
        }
      ]
    });
  }, []);

  if (!data) return <p>Loading graph...</p>;

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const time = tooltipItem.label;
            const availability = tooltipItem.raw;
            return `${time}: ${availability} lots available`;
          }
        }
      },
      legend: {
        position: "top"
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x"
        },
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: "x"
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Lots Available"
        }
      },
      x: {
        title: {
          display: true,
          text: "Time of Day"
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12
        }
      }
    }
  };

  return (
    <div>
        <h2 className="predicted-heading">Projected Car Park Availability</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PredictedCarParkAvail;
