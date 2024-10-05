import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const searchFoodTrucks = async (params: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/foodtrucks/search`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching food truck data:", error);
    throw error;
  }
};