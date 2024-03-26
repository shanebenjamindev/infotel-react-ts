import { HotelData } from "../../../data";
import { Table } from "antd";

export default function ActualData() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Property",
      dataIndex: "property",
      key: "property",
    },
    {
      title: "Total Room in Hotel",
      dataIndex: "totalRoomInHotel",
      key: "totalRoomInHotel",
    },
    {
      title: "Room Revenue",
      dataIndex: "roomRevenue",
      key: "roomRevenue",
    },
    {
      title: "F&B Revenue",
      dataIndex: "FBRevenue",
      key: "F&BRevenue",
    },
    {
      title: "Other Revenue",
      dataIndex: "otherRevenue",
      key: "otherRevenue",
    },
    {
      title: "Total Revenue",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
    },
    {
      title: "Occ %",
      dataIndex: "occPercentage",
      key: "occPercentage",
    },
    {
      title: "ADR",
      dataIndex: "ADR",
      key: "ADR",
    },
    {
      title: "Hotel Room",
      dataIndex: "hotelRoom",
      key: "hotelRoom",
    },
    {
      title: "Available Rooms",
      dataIndex: "availableRooms",
      key: "availableRooms",
    },
    {
      title: "Occupied Room",
      dataIndex: "occupiedRoom",
      key: "occupiedRoom",
    },
    {
      title: "Group Rooms",
      dataIndex: "groupRooms",
      key: "groupRooms",
    },
    {
      title: "Transient Rooms",
      dataIndex: "transientRooms",
      key: "transientRooms",
    },
  ];

  const dataSource = HotelData[0]?.actualData ?? [];
  const grandTotal = {
    property: "Grand Total",
    totalRoomInHotel: dataSource.reduce(
      (acc, curr) => acc + curr.totalRoomInHotel,
      0
    ),
    roomRevenue: dataSource.reduce(
      (acc, curr) => acc + parseFloat(curr.roomRevenue.replace("$", "")),
      0
    ),
    FBRevenue: dataSource.reduce(
      (acc, curr) => acc + parseFloat(curr.FBRevenue.replace("$", "")),
      0
    ),
    otherRevenue: dataSource.reduce(
      (acc, curr) => acc + parseFloat(curr.otherRevenue.replace("$", "")),
      0
    ),
    totalRevenue: dataSource.reduce(
      (acc, curr) => acc + parseFloat(curr.totalRevenue.replace("$", "")),
      0
    ),
    occPercentage: dataSource.reduce(
      (acc, curr) => acc + parseFloat(curr.occPercentage.replace("%", "")),
      0
    ),
    ADR: dataSource.reduce(
      (acc, curr) => acc + parseFloat(curr.ADR.replace("$", "")),
      0
    ),
    hotelRoom: dataSource.reduce((acc, curr) => acc + curr.hotelRoom, 0),
    availableRooms: dataSource.reduce(
      (acc, curr) => acc + curr.availableRooms,
      0
    ),
    occupiedRoom: dataSource.reduce(
      (acc, curr) => acc + parseFloat(curr.occupiedRoom.replace("$", "")),
      0
    ),
    groupRooms: dataSource.reduce(
      (acc, curr) => acc + parseFloat(curr.groupRooms.replace("$", "")),
      0
    ),
    transientRooms: dataSource.reduce(
      (acc, curr) => acc + parseFloat(curr.transientRooms.replace("$", "")),
      0
    ),
  };
  const dataWithGrandTotal = [...dataSource, grandTotal];

  return (
    <section className="">
      <div className="section__Content">
        <h1 className="content__SubTitle">Actual Data</h1>
        <div style={{ overflowX: "scroll", width: "100%" }}>
          <Table
            columns={columns}
            dataSource={dataWithGrandTotal}
            rowKey="property"
            pagination={false}
          />
        </div>
      </div>
    </section>
  );
}
