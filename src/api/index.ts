import { getRequest } from "./config";
import { ApiResponse, AirportsList, TripDetails, IFlights } from "../interfaces/global";

export const getLocale = () => {
  return getRequest("getLocale");
};

export const searchAirports = async (
  query: string
): Promise<ApiResponse<AirportsList>> => {
  return getRequest(`flights/searchAirport?query=${query}&locale=en-US`);
};

export const searchFlights = async (
  params: null | TripDetails
): Promise<ApiResponse<IFlights>> => {
  return getRequest(`flights/searchFlights`, params);
};