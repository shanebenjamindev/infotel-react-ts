import { fetchSidebarData } from "../utils/SidebarUtils.ts";
import { HotelData } from "../data";

const resolvers = {
  Query: {
    sidebar: async () => {
      try {
        const sidebarData = await fetchSidebarData();
        return sidebarData;
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
        return []; // Return empty array in case of error
      }
    },
    actualData: () => {
      // Implement logic to fetch actual data (mocked)
      return HotelData[0]?.actualData ?? [];
    },
    reservationForecast: () => {
      // Implement logic to fetch reservation forecast data (mocked)
      return HotelData[1]?.reservationForecast ?? [];
    },
    periodDetail: () => {
      // Implement logic to fetch period detail data (mocked)
      return HotelData[2]?.periodDetail ?? [];
    },
  },
};

export default resolvers;
