import { sidebar } from "../data";

export const fetchSidebarData = async () => {
  try {
    // Simulate an asynchronous fetch operation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mocked data fetching
    return sidebar;
  } catch (error) {
    console.error("Error fetching sidebar data:", error);
    return []; // Return empty array in case of error
  }
};
