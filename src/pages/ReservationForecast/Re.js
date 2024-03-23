import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { reservationForecastMonth } from "../../data";
const ReservationForecast = () => {
  const svgRef = useRef(null);
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");

  const [data, setData] = useState(reservationForecastMonth);

  const filterData = (period: any) => {
    const currentDate = new Date("29-Feb-2020");
    let filteredData = reservationForecastMonth;

    switch (period) {
      case "this-month":
        return currentDate;
      case "3-months":
        const threeMonths = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 3,
          1
        );

        filteredData = reservationForecastMonth.filter(
          (entry: any) => new Date(entry.from_date) >= threeMonths
        );
        break;
      case "6-months":
        const sixMonthsLater = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 6,
          1
        );

        filteredData = reservationForecastMonth.filter(
          (entry: any) => new Date(entry.from_date) >= sixMonthsLater.getMonth()
        );
        break;
      default:
        filteredData = reservationForecastMonth;
    }
    setData(filteredData);
  };

  console.log(data);

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
    filterData(e.target.value);
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 0, bottom: 20, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const xDomain = d3.extent(data.map((d: any) => new Date(d.from_date)));
    const yDomain = d3.max(data.map((d: any) => d.total["Total Room"]));

    const xScale = d3.scaleTime().domain(xDomain).range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, yDomain])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .select(".x-axis")
      .attr("transform", `translate(65, ${height})`)
      .call(xAxis);
    svg
      .select(".y-axis")
      .attr("transform", `translate(${margin.left}, 10)`)
      .call(yAxis);
  }, [data]);

  const renderDate = () => {
    return data.map((d) => d.from_date);
  };

  return (
    <div>
      <label htmlFor="forecast-period">
        Choose forecast period: current date:
      </label>
      {renderDate()}
      <select
        id="forecast-period"
        value={selectedPeriod}
        onChange={handlePeriodChange}
      >
        <option value="this-month">This Month</option>
        <option value="3-months">3 Months</option>
        <option value="6-months">6 Months</option>
      </select>
      <svg
        ref={svgRef}
        width={"100%"}
        height={600}
        style={{ paddingLeft: "110px" }}
      >
        <g className="x-axis" />
        <g className="y-axis" />
        <path
          className="total-occ-line"
          fill="none"
          stroke="steelblue"
          strokeWidth="2"
        />
        <path
          className="arr-rooms-line"
          fill="none"
          stroke="green"
          strokeWidth="2"
        />
        <path
          className="dep-rooms-line"
          fill="none"
          stroke="red"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default ReservationForecast;
