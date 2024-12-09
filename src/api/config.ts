import axios from "axios";

const API_BASE_URL = "https://sky-scrapper.p.rapidapi.com/api/";
const API_BASE_HOST = "sky-scrapper.p.rapidapi.com";
const API_KEY = "31bae21bbcmshc3a6492b8db041ap1df4ffjsn7fd0b08311db";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": API_BASE_HOST,
  },
});

export const getRequest = async <T>(
  url: string,
  params: unknown = {},
  version = "v1"
): Promise<T> => {
  try {
    const { data } = await apiClient.get<T>(`${version}/${url}`, { params });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "An error occurred while fetching data"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export default apiClient;
