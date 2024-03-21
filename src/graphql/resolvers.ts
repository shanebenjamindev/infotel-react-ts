const resolvers = {
    Query: {
      sidebar: () => {
        // Implement logic to fetch sidebar data (mocked)
        return sidebarData;
      },
      actualData: () => {
        // Implement logic to fetch actual data (mocked)
        return actualData;
      },
      reservationForecast: () => {
        // Implement logic to fetch reservation forecast data (mocked)
        return reservationForecast;
      },
      periodDetail: () => {
        // Implement logic to fetch period detail data (mocked)
        return periodDetail;
      },
    },
  };
  