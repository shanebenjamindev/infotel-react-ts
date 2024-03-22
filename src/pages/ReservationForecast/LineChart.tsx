import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { ReservationForecast } from "../../data";

interface DataItem {
  Date: string;
  "Total Occ.": number;
  "Arr. Rooms": number;
  "Dep. Rooms": number;
}

interface Props {
  data: DataItem[];
}

const LineChart: React.FC<Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [period, setPeriod] = useState<number>(3);

  const filterDataByPeriod = (data: DataItem[], period: number): DataItem[] => {
    const currentDate = new Date("2020-02-29");
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.date);
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - period + 1,
        1
      );

      return itemDate >= startDate && itemDate <= currentDate;
    });
    return filteredData;
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(Number(e.target.value));
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 0, bottom: 30, left: 160 };
    const width = 1200;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const parseDate = d3.timeParse("%d-%b-%Y");
    const formatTime = d3.timeFormat("%b %Y");

    const filteredData = filterDataByPeriod(ReservationForecast, period);

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const line = d3
      .line<DataItem>()
      .x((d) => x(parseDate(d.date)) || 0)
      .y((d) => y(d["Total Occ."]));

    const xAxis = d3.axisBottom(x).tickFormat(formatTime);
    const yAxis = d3.axisLeft(y);

    x.domain(d3.extent(filteredData, (d) => parseDate(d.date)) as [Date, Date]);
    y.domain([0, d3.max(filteredData, (d) => d["Total Occ."]) as number]);

    svg.selectAll("*").remove(); // Clear previous elements

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(yAxis);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${height + margin.top})`)
      .call(xAxis);

    svg
      .append("path")
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }, [data, period]);

  return (
    <div>
      <h2>Occupancy Forecast</h2>
      <div>
        <label htmlFor="period">Select Period: </label>
        <select id="period" value={period} onChange={handlePeriodChange}>
          <option>This Month</option>
          <option>3 Months</option>
          <option>6 Months</option>
        </select>
      </div>
      <svg ref={svgRef} width="800" height="400"></svg>
    </div>
  );
};

export default LineChart;
