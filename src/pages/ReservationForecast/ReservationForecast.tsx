import React, { useEffect, useRef, useState } from "react";
import { ReservationForecast } from "../../data";
import * as d3 from "d3";

const ReservationForecastChart = () => {
  console.log(ReservationForecast);
  const svgRef = useRef<SVGSVGElement>(null); // Initialize as null

  useEffect(() => {
    if (ReservationForecast) {
      const width = 1500;
      const height = 300;
      const marginTop = 20;
      const marginRight = 0;
      const marginBottom = 90;
      const marginLeft = 90;

      ReservationForecast.forEach((d) => {
        d.date = new Date(d.date);
        d.expectedOccupancy = +d.expectedOccupancy;
      });

      // Declare the x (horizontal position) scale.
      const x = d3
        .scaleUtc()
        .domain(d3.extent(ReservationForecast, (d) => d.date) as [Date, Date])
        .range([marginLeft, width - marginRight]);

      // Declare the y (vertical position) scale.
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(ReservationForecast, (d) => d.expectedRevenue)!])
        .nice()
        .range([height - marginBottom, marginTop]);

      // Declare the line generator.
      const line = d3
        .line()
        .x((d) => x(d.date))
        .y((d) => y(d.expectedRevenue));

      // Create the SVG container.
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      // Add the x-axis.
      svg
        .append("g")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(d3.axisBottom(x));

      // Add the y-axis.
      svg
        .append("g")
        .attr("transform", `translate(${marginLeft}, 0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.select(".domain").remove());

      // Add the grid lines for y-axis.
      svg
        .append("g")
        .attr("class", "grid")
        .attr("transform", `translate(${marginLeft}, 0)`)
        .call(
          d3
            .axisLeft(y)
            .ticks(10)
            .tickSize(-(width - marginLeft - marginRight))
            .tickFormat(() => "")
        );

      // Append a path for the line.
      svg
        .append("path")
        .datum(ReservationForecast)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

      // Add x-axis label
      svg
        .append("text")
        .attr("transform", `translate(${width / 2}, ${height - 10})`)
        .style("text-anchor", "middle")
        .text("Date");

      // Add y-axis label
      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Expected Occupancy");
    }
  }, [ReservationForecast]);

  return (
    <div className="w-100">
      <svg ref={svgRef}></svg>
    </div>
  );
};
export default ReservationForecastChart;
