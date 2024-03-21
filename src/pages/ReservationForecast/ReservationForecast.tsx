import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { HotelData } from "../../data";

const ReservationForecastChart = () => {
  const [forecastPeriod, setForecastPeriod] = useState("thisMonth");
  const [chartData, setChartData] = useState({});
  const data = HotelData[0]?.reservationForecast ?? [];

  useEffect(() => {
    const filteredData = data.filter((item) => {
      // Filter data based on selected forecast period
      const currentDate = new Date();
      const forecastDate = new Date(item.date);
      switch (forecastPeriod) {
        case "thisMonth":
          return currentDate.getMonth() === forecastDate.getMonth();
        case "threeMonths":
          return (
            forecastDate.getMonth() >= currentDate.getMonth() &&
            forecastDate.getMonth() <= currentDate.getMonth() + 2
          );
        case "sixMonths":
          return (
            forecastDate.getMonth() >= currentDate.getMonth() &&
            forecastDate.getMonth() <= currentDate.getMonth() + 5
          );
        default:
          return true;
      }
    });

    // Extract data for the selected forecast period
    const labels = filteredData.map((item) => item.date);
    const totalOcc = filteredData.map((item) => item.expectedOccupancy);
    const arrRooms = filteredData.map((item) => item.expectedRevenue);
    const depRooms = filteredData.map((item) => item.expectedRevenue * 0.8); // Assuming 80% of expected revenue is for departing rooms

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Total Occ",
          data: totalOcc,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
        {
          label: "Arr. Rooms",
          data: arrRooms,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
        {
          label: "Dep. Rooms",
          data: depRooms,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    });
  }, [forecastPeriod, data]);

  const handlePeriodChange = (period) => {
    setForecastPeriod(period);
  };

  return (
    <div>
      <h2>Reservation Forecast</h2>
      <div>
        <button onClick={() => handlePeriodChange("thisMonth")}>
          This Month
        </button>
        <button onClick={() => handlePeriodChange("threeMonths")}>
          3 Months
        </button>
        <button onClick={() => handlePeriodChange("sixMonths")}>
          6 Months
        </button>
      </div>
      <Line data={chartData} />
    </div>
  );
};

export default ReservationForecastChart;
