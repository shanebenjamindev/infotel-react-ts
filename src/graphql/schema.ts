type Query {
  sidebar: [SidebarItem]!
  actualData: [ActualDataItem]!
  reservationForecast: [ReservationForecastItem]!
  periodDetail: [PeriodDetailItem]!
}

type SidebarItem {
  id: ID
  title: String!
  listItems: [SidebarListItem]!
}

type SidebarListItem {
  id: ID!
  title: String!
  url: String!
  icon: String!
}

type ActualDataItem {
  id: ID!
  property: String!
  totalRoomInHotel: Int!
  roomRevenue: String!
  FBRevenue: String!
  otherRevenue: String!
  totalRevenue: String!
  occPercentage: String!
  ADR: String!
  hotelRoom: Int!
  availableRooms: Int!
  occupiedRoom: String!
  groupRooms: String!
  transientRooms: String!
  occupiedRoomPercentage: String!
  groupRoomPercentage: String!
  transientRoomPercentage: String!
}

type ReservationForecastItem {
  date: String!
  expectedOccupancy: Int!
  expectedRevenue: Int!
}

type PeriodDetailItem {
  period: String!
  fromDate: String!
  toDate: String!
}
