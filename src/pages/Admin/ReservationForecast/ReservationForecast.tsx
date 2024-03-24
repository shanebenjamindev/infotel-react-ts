import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const ReservationForecast: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("6-months");
  const [chartData, setChartData] = useState<any[]>([]);
  const margin = { top: 20, right: 20, bottom: 30, left: 70 };
  const width = 600 - margin.left - margin.right;
  const height = 200 - margin.top - margin.bottom;

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/Reservations.csv");
      const csvData = await response.text();
      const parsedData = d3.csvParse(csvData);
      const filteredData = parsedData.filter((entry: any) => {
        const currentDate = new Date("29-Feb-2020");
        const date = new Date(entry.Date);
        switch (selectedPeriod) {
          case "this-month":
            return (
              date.getMonth() === currentDate.getMonth() &&
              date.getFullYear() === currentDate.getFullYear()
            );
          case "3-months":
            const threeMonths = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 2
            );
            return date <= threeMonths;
          case "6-months":
            const sixMonthsLater = new Date(currentDate);
            sixMonthsLater.setMonth(currentDate.getMonth() + 6);
            return date <= sixMonthsLater;
          default:
            return true;
        }
      });
      setChartData(filteredData);
    };

    fetchData();
  }, [selectedPeriod]);

  useEffect(() => {
    if (chartData.length > 0) {
      drawChart();
    }
  }, [chartData]);

  const drawChart = () => {
    const svg = d3.select(svgRef.current);
    const width = 1300;

    const x = d3
      .scaleTime()
      .domain(
        d3.extent(chartData, (d: any) => new Date(d.Date)) as [Date, Date]
      )
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(chartData, (d: any) =>
          Math.max(+d["Total Occ."], +d["Arr. Rooms"], +d["Dep. Rooms"])
        ),
      ] as [number, number])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const lineTotalOcc = d3
      .line<any>()
      .x((d) => x(new Date(d.Date)))
      .y((d) => y(+d["Total Occ."]));

    const lineArrRooms = d3
      .line<any>()
      .x((d) => x(new Date(d.Date)))
      .y((d) => y(+d["Arr. Rooms"]));

    const lineDepRooms = d3
      .line<any>()
      .x((d) => x(new Date(d.Date)))
      .y((d) => y(+d["Dep. Rooms"]));

    svg.selectAll("*").remove();

    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", lineTotalOcc);

    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("d", lineArrRooms);

    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", lineDepRooms);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  };

  return (
    <section>
      <h2>Reservation Forecast</h2>
      <select value={selectedPeriod} onChange={handlePeriodChange}>
        <option value="this-month">This Month</option>
        <option value="3-months">3 Months</option>
        <option value="6-months">6 Months</option>
      </select>
      <div style={{ overflowX: "scroll" }}>
        <svg ref={svgRef} width="100%"></svg>
      </div>
    </section>
  );
};

export default ReservationForecast;
