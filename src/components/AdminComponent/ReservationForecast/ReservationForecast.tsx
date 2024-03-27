import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./reservationForecast.scss";
import * as XLSX from "xlsx";
import { Table } from "antd";

const ReservationForecast: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("6-months");
  const [chartData, setChartData] = useState<any[]>([]);
  const margin = { top: 20, right: 0, bottom: 30, left: 50 };
  const width = 1500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/Reservations.csv");
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
              currentDate.getMonth() + 3
            );
            return date < threeMonths;
          case "6-months":
            const sixMonthsLater = new Date(currentDate);
            sixMonthsLater.setMonth(currentDate.getMonth() + 6);
            return date < sixMonthsLater;
          default:
            return true;
        }
      });
      filteredData.sort(
        (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
      );

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
    const viewBoxWidth = width + margin.left + margin.right;
    const viewBoxHeight = height + margin.top + margin.bottom;

    svg.attr("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

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

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

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

    // Line Blue
    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", lineTotalOcc);
    // Line Green
    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("d", lineArrRooms);

    // Line Red
    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", lineDepRooms);

    // X
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom<Date>(x).tickFormat(d3.timeFormat("%d-%m-%Y")));
    svg
      .selectAll(".line-to-x")
      .data(chartData)
      .enter()
      .append("line")
      .attr("class", "line-to-x")
      .attr("x1", (d: any) => x(new Date(d.Date)))
      .attr("y1", () => y(0))
      .attr("x2", (d: any) => x(new Date(d.Date)))
      .attr("y2", (d: any) => y(+d["Total Occ."])) // Adjust to the appropriate y-value
      .style("stroke", "gray")
      .style("stroke-dasharray", "3");
    // Y
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
    svg
      .selectAll(".line-to-y")
      .data(chartData)
      .enter()
      .append("line")
      .attr("class", "line-to-y")
      .attr("x1", (d: any) => x(new Date(d.Date)))
      .attr("y1", (d: any) => y(+d["Total Occ."]))
      .attr("x2", margin.left)
      .attr("y2", (d: any) => y(+d["Total Occ."]))
      .style("stroke", "gray")
      .style("stroke-dasharray", "3");

    // Dots
    svg
      .selectAll(".dot-total-occ")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "dot-total-occ")
      .attr("cx", (d: any) => x(new Date(d.Date)))
      .attr("cy", (d: any) => y(+d["Total Occ."]))
      .attr("r", 5)
      .style("fill", "steelblue")
      .on("mouseover", function (d, event) {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`Date: ${d.Date}<br>Total Occ.: ${d["Total Occ."]}`)
          .style("left", `${event.pageX}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    svg
      .selectAll(".dot-arr-rooms")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "dot-arr-rooms")
      .attr("cx", (d: any) => x(new Date(d.Date)))
      .attr("cy", (d: any) => y(+d["Arr. Rooms"]))
      .attr("r", 5)
      .style("fill", "green")
      .on("mouseover", function (d, event) {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`Date: ${d.Date}<br>Total Occ.: ${d["Total Occ."]}`)
          .style("left", `${event.pageX}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    svg
      .selectAll(".dot-dep-rooms")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "dot-dep-rooms")
      .attr("cx", (d: any) => x(new Date(d.Date)))
      .attr("cy", (d: any) => y(+d["Dep. Rooms"]))
      .attr("r", 5)
      .style("fill", "red")
      .on("mouseover", function (d, event) {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`Date: ${d.Date}<br>Total Occ.: ${d["Total Occ."]}`)
          .style("left", `${event.pageX}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", function () {
        tooltip.style("opacity", 1);
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      })
      .on("mousemove", function (event) {
        const [xMouse, yMouse] = d3.pointer(event);

        const date = x.invert(xMouse);

        const dataPoint = chartData?.find((data) => {
          const dataDate = new Date(data.Date);
          return (
            dataDate.getDate() === date.getDate() &&
            dataDate.getMonth() === date.getMonth() &&
            dataDate.getFullYear() === date.getFullYear()
          );
        });
        // Toolkit
        tooltip
          .html(
            `
            <div class="tooltip-content" style="background-color: var(--light-bg-color); padding: 30px; border: 1px solid black">
            <p class="mb-0">
              <strong>Date:</strong> ${dataPoint.Date}
            </p>
            <p class="mb-0">
              <strong style = "color: steelblue">Total Occ.: ${dataPoint["Total Occ."]}</strong>
            </p>
            <p class="mb-0">
              <strong style = "color: green">Arr. Rooms: ${dataPoint["Arr. Rooms"]}</strong>
            </p>
            <p class="mb-0">
              <strong style="color: red">Dep. Rooms: ${dataPoint["Dep. Rooms"]}</strong>
            </p>
          </div>  
              
              `
          )
          .style("left", event.pageX - 200 + "px")
          .style("top", yMouse - 100 + "px");
      });
  };

  useEffect(() => {
    const tooltip = d3
      .select("svg")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    return () => {
      tooltip.remove();
    };
  }, [selectedPeriod]);

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(chartData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ReservationData");
    XLSX.writeFile(wb, "reservation_data.xlsx");
  };

  return (
    <section className="reservation">
      <div className="section__Content d-md-flex align-items-center justify-content-between mb-5">
        <h2 className="content__SubTitle">Reservation Forecast</h2>
        <div>
          <span className="mr-2">Select period:</span>
          <select
            className="reservation__Select my-3"
            value={selectedPeriod}
            onChange={handlePeriodChange}
          >
            <option value="this-month">This Month</option>
            <option value="3-months">3 Months</option>
            <option value="6-months">6 Months</option>
          </select>
        </div>
      </div>
      <div
        style={{
          overflow: "scroll",
          width: "100%",
          border: " 1px dashed #aaa",
        }}
      >
        <svg ref={svgRef} width="100%" height="100%"></svg>
      </div>
      <div className="mt-5 section__Content">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="content__SubTitle">Period Details</h2>
          <button className="btn btn-outline-success" onClick={downloadExcel}>
            Download Excel
          </button>
        </div>

        <NestedTable data={chartData} />
      </div>
    </section>
  );
};

const NestedTable: React.FC<{ data: any[] }> = ({ data }) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "Total Occ.",
      dataIndex: "Total Occ.",
      key: "TotalOcc",
    },
    {
      title: "Arr. Rooms",
      dataIndex: "Arr. Rooms",
      key: "ArrRooms",
    },
    {
      title: "Dep. Rooms",
      dataIndex: "Dep. Rooms",
      key: "DepRooms",
    },
  ];
  return (
    <div className="admin__Overflow" style={{ overflowX: "auto" }}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(outlet) => outlet.Date}
      />
    </div>
  );
};

export default ReservationForecast;
