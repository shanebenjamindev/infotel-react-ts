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
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("../../../Reservations.csv");
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
              currentDate.getMonth() + 4
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

        tooltip
          .html(
            `<strong>Date: </strong>${dataPoint.Date}<br>` +
              `<strong>Total Occ.: </strong>${dataPoint["Total Occ."]}<br>` +
              `<strong>Arr. Rooms: </strong>${dataPoint["Arr. Rooms"]}<br>` +
              `<strong>Dep. Rooms: </strong>${dataPoint["Dep. Rooms"]}`
          )
          .style("left", xMouse + 700 + "px")
          .style("top", yMouse + 200 + "px");
      });
  };

  useEffect(() => {
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Other code for fetching data and drawing chart...

    // Cleanup function
    return () => {
      tooltip.remove(); // Remove the tooltip when the component unmounts
    };
  }, [selectedPeriod]);

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(chartData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ReservationData");
    XLSX.writeFile(wb, "reservation_data.xlsx");
  };

  return (
    <div className="h-100 d-flex flex-column justify-content-center">
      <h2>Reservation Forecast</h2>
      <div className="d-flex justify-content-end">
        <select
          className="reservation__Select"
          value={selectedPeriod}
          onChange={handlePeriodChange}
        >
          <option value="this-month">This Month</option>
          <option value="3-months">3 Months</option>
          <option value="6-months">6 Months</option>
        </select>
      </div>
      <div
        style={{
          overflow: "scroll",
          width: "100%",
          height: "50%",
          border: " 1px dashed #aaa",
        }}
      >
        <svg ref={svgRef} width="100%" height="100%"></svg>
      </div>
      <div className=" mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Reservation Forecast</h2>
          <button className="btn btn-outline-success" onClick={downloadExcel}>
            Download Excel
          </button>
        </div>
        <NestedTable data={chartData} />
      </div>
    </div>
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
    <div
      className="period__Detail"
      style={{ overflowX: "auto", marginTop: "20px" }}
    >
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default ReservationForecast;
