import React, { createContext, useState, ReactNode } from "react";
import { Airport } from "../interfaces/global";

interface SearchContextType {
  from: Airport | string;
  to: Airport | string;
  fromDate: string;
  toDate: string;
  tripType: string;
  itineraries: any[];
  setFrom: (value: string) => void;
  setTo: (value: string) => void;
  setFromDate: (value: string) => void;
  setToDate: (value: string) => void;
  setTripType: (value: string) => void;
  setItineraries: (value: any[]) => void;
}

export const SearchContext = createContext<SearchContextType>({
  from: "",
  to: "",
  fromDate: "",
  toDate: "",
  tripType: "Round trip",
  itineraries: [],
  setFrom: () => {},
  setTo: () => {},
  setFromDate: () => {},
  setToDate: () => {},
  setTripType: () => {},
  setItineraries: () => {},
});

export const SearchContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [from, setFrom] = useState<Airport | string>("");
  const [to, setTo] = useState<Airport | string>("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tripType, setTripType] = useState("Round trip");
  const [itineraries, setItineraries] = useState<any[]>([]);

  return (
    <SearchContext.Provider
      value={{
        from,
        to,
        fromDate,
        toDate,
        tripType,
        itineraries,
        setFrom,
        setTo,
        setFromDate,
        setToDate,
        setTripType,
        setItineraries,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
