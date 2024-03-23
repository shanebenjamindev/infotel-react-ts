import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { reservationForecastMonth } from "../../data";

const ReservationForecast = () => {
  const svgRef = useRef(null);
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [chartData, setChartData] = useState([]);

  const filterData = (period) => {
    const currentDate = new Date("29-Feb-2020");
    let filteredData = reservationForecastMonth;

    switch (period) {
      case "this-month":
        filteredData = reservationForecastMonth.filter((entry) => {
          const thisMonth = new Date(entry.from_date);
          return (
            thisMonth.getMonth() === currentDate.getMonth() &&
            thisMonth.getFullYear() === currentDate.getFullYear()
          );
        });
        break;
      case "3-months":
        const threeMonths = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 2
        );
        filteredData = reservationForecastMonth.filter(
          (entry) => new Date(entry.from_date) <= threeMonths
        );
        break;
      case "6-months":
        const sixMonthsLater = new Date(currentDate);
        sixMonthsLater.setMonth(currentDate.getMonth() + 6);
        filteredData = reservationForecastMonth.filter(
          (entry) => new Date(entry.from_date) <= sixMonthsLater
        );
        break;
      default:
        filteredData = reservationForecastMonth;
    }
    return filteredData;
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  useEffect(() => {
    const filteredData = filterData(selectedPeriod);
    setChartData(filteredData);
  }, [selectedPeriod]);

  useEffect(() => {
    if (chartData.length > 0) {
      drawChart();
    }
  }, [chartData]);

  const drawChart = () => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 30, left: 70 };
    const width = 600 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    svg.selectAll("*").remove();

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // const lineTotalOcc = d3
    //   .line()
    //   .x((d) => x(new Date(d.from_date)))
    //   .y((d) => y(d.total["Total Occ"]));

    // const lineArrRooms = d3
    //   .line()
    //   .x((d) => x(new Date(d.from_date)))
    //   .y((d) => y(d.total["Arr. Rooms"]));

    // const lineDepRooms = d3
    //   .line()
    //   .x((d) => x(new Date(d.from_date)))
    //   .y((d) => y(d.total["Dep. Rooms"]));

    const line = d3
      .line()
      .x((d) => x(new Date(d.from_date)))
      .y((d) => y(d.total["Total Room"]));

    x.domain(d3.extent(chartData, (d) => new Date(d.from_date)));
    y.domain([21200, d3.max(chartData, (d) => Math.max(d.total["Total Room"]))]);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .append("path")
      .data([chartData])
      .style("fill", "none")
      .style("stroke", "steelblue")
      .style("stroke-width", 1)
      .attr("d", line);

    // svg
    //   .append("g")
    //   .attr("transform", `translate(${margin.left}, ${margin.top})`)
    //   .append("path")
    //   .data([chartData])
    //   .attr("class", "line")
    //   .attr("d", lineArrRooms);

    // svg
    //   .append("g")
    //   .attr("transform", `translate(${margin.left}, ${margin.top})`)
    //   .append("path")
    //   .data([chartData])
    //   .attr("class", "line")
    //   .style("stroke", "red")
    //   .attr("d", lineDepRooms);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(y));
  };

  return (
    <div>
      <h2>Reservation Forecast</h2>
      <select value={selectedPeriod} onChange={handlePeriodChange}>
        <option value="this-month">This Month</option>
        <option value="3-months">3 Months</option>
        <option value="6-months">6 Months</option>
      </select>
      <svg ref={svgRef} width={1600} height={400}></svg>
    </div>
  );
};

export default ReservationForecast;
