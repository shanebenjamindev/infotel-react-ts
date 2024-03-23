import { sidebar } from "../data";

export const fetchSidebarData = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return sidebar;
  } catch (error) {
    console.error("Error fetching sidebar data:", error);
    return []; 
  }
};
