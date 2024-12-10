import React, { useState, useEffect, useRef } from "react";
import { fetchWeatherApi } from "openmeteo";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  zoomPlugin
);

// Helper function to form time ranges
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

function Weather({ trip }) {
  const [weatherData, setWeatherData] = useState(null);
  const [days, setDays] = useState(4);
  const temperatureChartRef = useRef(null);
  const precipitationChartRef = useRef(null);

  const itinerary = trip?.tripData?.itinerary;

  const fetchWeatherData = async (latitude, longitude) => {
    const params = {
      latitude: latitude,
      longitude: longitude,
      hourly: ["temperature_2m", "precipitation"],
      timezone: "GMT",
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly();

    const weatherData = {
      hourly: {
        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature2m: hourly.variables(0)?.valuesArray() || [],
        precipitation: hourly.variables(1)?.valuesArray() || [],
      },
    };

    return weatherData;
  };

  const fetchWeatherForItinerary = async () => {
    const places = Object.values(itinerary || {}).flat();
    const weatherResponses = [];

    for (const place of places) {
      const { latitude, longitude } = place.geoCoordinates;
      const weather = await fetchWeatherData(latitude, longitude);
      weatherResponses.push(weather);
    }

    setWeatherData(weatherResponses);
  };

  useEffect(() => {
    if (itinerary) {
      fetchWeatherForItinerary();
    }
  }, [itinerary]);

  const handleDaysChange = (e) => {
    const value = Math.max(1, e.target.value);
    setDays(value);
  };

  if (!weatherData) {
    return <div>Loading weather...</div>;
  }

  const generateChartData = (weather) => {
    let labels = [];
    let temperatureData = [];
    let precipitationData = [];

    const limitedWeatherData = weather.slice(0, days);

    limitedWeatherData.forEach((day) => {
      day.hourly.time.forEach((time, index) => {
        const label = time.toLocaleString("en-US", { weekday: "short", hour: "2-digit", minute: "2-digit" });
        labels.push(label);
        temperatureData.push(day.hourly.temperature2m[index]);
        precipitationData.push(day.hourly.precipitation[index]);
      });
    });

    return {
      temperature: {
        labels: labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperatureData,
            borderColor: "#FF7F7F",
            backgroundColor: "rgba(255, 127, 127, 0.3)",
            fill: true,
          },
        ],
      },
      precipitation: {
        labels: labels,
        datasets: [
          {
            label: "Precipitation (mm)",
            data: precipitationData,
            backgroundColor: "rgba(235, 87, 87, 0.3)",
            borderColor: "#EB5757",
            borderWidth: 1,
          },
        ],
      },
    };
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", backgroundColor: "#FFFFFF", color: "#151515" }}>
      <h2 style={{ fontWeight: "bold", color: "#151515", fontSize: "30px" }}>Weather Information</h2>

      <div>
        <label htmlFor="days" style={{ fontWeight: "bold", fontSize: "18px", color: "#151515" }}>
          Select Number of Days: 
        </label>
        <input
          type="range"
          id="days"
          value={days}
          min={1}
          max={7}
          onChange={handleDaysChange}
          style={{
            padding: "5px",
            margin: "10px",
            width: "250px",
            backgroundColor: "#FF6F61",
            color: "#FFFFFF",
            borderRadius: "10px",
            transition: "all 0.3s ease-in-out",
          }}
        />
        <span style={{ fontWeight: "bold", fontSize: "18px", color: "#151515" }}>{days}</span>
      </div>

      <div style={{ width: "80%", margin: "0 auto" }}>
        <h4 style={{ color: "#C73659", fontWeight: "bold", fontSize: "24px" }}>
          Temperature for the Next {days} Days
        </h4>

        <Line
          ref={temperatureChartRef}
          data={generateChartData(weatherData).temperature}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: false,
                grid: {
                  color: "#EEEEEE",
                },
              },
              x: {
                grid: {
                  color: "#EEEEEE",
                },
              },
            },
            plugins: {
              zoom: {
                pan: {
                  enabled: true,
                  mode: "xy",
                },
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true,
                  },
                  mode: "xy",
                },
              },
            },
          }}
        />
        <button
          onClick={() => temperatureChartRef.current.resetZoom()}
          style={{
            padding: "5px 10px",
            marginTop: "10px",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#FFFFFF",
            backgroundColor: "#C73659",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Reset Temperature Zoom
        </button>
      </div>

      <div style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}>
        <h4 style={{ color: "#C73659", fontWeight: "bold", fontSize: "24px" }}>
          Precipitation for the Next {days} Days
        </h4>
        <Bar
          ref={precipitationChartRef}
          data={generateChartData(weatherData).precipitation}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: false,
                grid: {
                  color: "#EEEEEE",
                },
              },
            },
            plugins: {
              zoom: {
                pan: {
                  enabled: true,
                  mode: "xy",
                },
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true,
                  },
                  mode: "xy",
                },
              },
            },
          }}
        />
        <button
          onClick={() => precipitationChartRef.current.resetZoom()}
          style={{
            padding: "5px 10px",
            marginTop: "10px",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#FFFFFF",
            backgroundColor: "#C73659",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Reset Precipitation Zoom
        </button>
      </div>
    </div>
  );
}

export default Weather;
