import { useContext } from "react";
import { Container, Box } from "@mui/material";

import SearchPanel from "../components/SearchPanel/SearchPanel";
import ItineraryItem from "../components/ItineraryItem/ItineraryItem";
import { SearchContext } from "../contexts/SearchContext";

const Flights: React.FC = () => {
  const { itineraries } = useContext(SearchContext);

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <SearchPanel />
        <Box style={{ padding: "10px", marginTop: "40px" }}>
          {itineraries?.slice(0,10)?.map((item, index) => (
            <ItineraryItem key={index} {...item} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Flights;
