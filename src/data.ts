export const sidebar = [
  {
    id: 1,
    title: "MAIN",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: "/",
        icon: "/home.svg",
      },
    ],
  },
  {
    id: 2,
    title: "ADMIN",
    listItems: [
      {
        id: 1,
        title: "Dashboard",
        url: "/admin",
        icon: "/home.svg",
      },
      {
        id: 2,
        title: "Profiles",
        url: "/admin/users",
        icon: "/user.svg",
      },
      {
        id: 3,
        title: "Actual Data",
        url: "/admin/actualData",
        icon: "/chart.svg",
      },
      {
        id: 4,
        title: "Reservation Forecast",
        url: "/admin/reservationForecast",
        icon: "/post.svg",
      },
      {
        id: 5,
        title: "Period Detail",
        url: "/admin/periodDetail",
        icon: "/form.svg",
      },
    ],
  },
];
export const HotelData = [
  {
    actualData: [
      {
        id: 1,
        property: "SPH1",
        totalRoomInHotel: 744,
        roomRevenue: "$234,458.70",
        FBRevenue: "$609,316.22",
        otherRevenue: "$51,547.30",
        totalRevenue: "$895,322.22",
        occPercentage: "22.80%",
        ADR: "$57.59",
        hotelRoom: 17856,
        availableRooms: 13785,
        occupiedRoom: "$234,458.70",
        groupRooms: "$145,896.90",
        transientRooms: "$88,561.79",
        occupiedRoomPercentage: "22.8%",
        groupRoomPercentage: "14.0%",
        transientRoomPercentage: "8.8%",
      },
      {
        id: 2,
        property: "SPH2",
        totalRoomInHotel: 744,
        roomRevenue: "$234,458.70",
        FBRevenue: "$609,316.22",
        otherRevenue: "$51,547.30",
        totalRevenue: "$895,322.22",
        occPercentage: "22.80%",
        ADR: "$57.59",
        hotelRoom: 17856,
        availableRooms: 13785,
        occupiedRoom: "$234,458.70",
        groupRooms: "$145,896.90",
        transientRooms: "$88,561.79",
        occupiedRoomPercentage: "22.8%",
        groupRoomPercentage: "14.0%",
        transientRoomPercentage: "8.8%",
      },
      {
        id: 3,
        property: "SPH3",
        totalRoomInHotel: 744,
        roomRevenue: "$234,458.70",
        FBRevenue: "$609,316.22",
        otherRevenue: "$51,547.30",
        totalRevenue: "$895,322.22",
        occPercentage: "22.80%",
        ADR: "$57.59",
        hotelRoom: 17856,
        availableRooms: 13785,
        occupiedRoom: "$234,458.70",
        groupRooms: "$145,896.90",
        transientRooms: "$88,561.79",
        occupiedRoomPercentage: "22.8%",
        groupRoomPercentage: "14.0%",
        transientRoomPercentage: "8.8%",
      },
    ],
  },

  {
    reservationForecast: [
      {
        date: "2024-03-26",
        expectedOccupancy: 85,
        expectedRevenue: 12500,
      },
      {
        date: "2024-03-27",
        expectedOccupancy: 90,
        expectedRevenue: 13500,
      },
      {
        date: "2024-03-28",
        expectedOccupancy: 80,
        expectedRevenue: 12000,
      },
      {
        date: "2024-03-29",
        expectedOccupancy: 95,
        expectedRevenue: 14500,
      },
      {
        date: "2024-03-30",
        expectedOccupancy: 75,
        expectedRevenue: 11500,
      },
    ],
  },
  {
    periodDetail: [
      {
        period: "01-Feb-2020 - 29-Feb-2020",
        fromDate: "01-Feb-2020",
        toDate: "29-Feb-2020",
      },
      {
        period: "01-Feb-2020 - 30-Apr-2020",
        fromDate: "01-Feb-2020",
        toDate: "30-Apr-2020",
      },
      {
        period: "01-Feb-2020 - 31-Jul-2020",
        fromDate: "01-Feb-2020",
        toDate: "31-Jul-2020",
      },
    ],
  },
];
