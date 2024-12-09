export interface ApiResponse<T> {
  data: T;
}

interface AirportPresentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

interface AirportRelevantFlightParams {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
}

interface AirportRelevantHotelParams {
  entityId: string;
  entityType: string;
  localizedName: string;
}

interface AirportNavigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: AirportRelevantFlightParams;
  relevantHotelParams: AirportRelevantHotelParams;
}

export interface Airport {
  skyId: string;
  entityId: string;
  presentation: AirportPresentation;
  navigation: AirportNavigation;
}

export interface AirportsList {
   data: Airport[];
}

export interface TripDetails {
  originSkyId?: string;
  originEntityId?: string;
  destinationSkyId?: string;
  destinationEntityId?: string;
  date: string; 
  returnDate?: string;
  tripType: string;
  cabinClass?: string;
  adults: number;
  children: number;
  infants: number;
  currency: string;
  sortBy: string;
}

export interface Itinerary {
  id: string;
  price: {
    raw: number;
    formatted: string;
    pricingOptionId: string;
  };
  legs: Array<{
    id: string;
    origin: {
      id: string;
      entityId: string;
      name: string;
      displayCode: string;
      city: string;
      country: string;
      isHighlighted: boolean;
    };
    destination: {
      id: string;
      entityId: string;
      name: string;
      displayCode: string;
      city: string;
      country: string;
      isHighlighted: boolean;
    };
    durationInMinutes: number;
    stopCount: number;
    isSmallestStops: boolean;
    departure: string;
    arrival: string;
    timeDeltaInDays: number;
    carriers: {
      marketing: Array<{
        id: number;
        alternateId: string;
        logoUrl: string;
        name: string;
      }>;
      operationType: string;
    };
    segments: Array<{
      id: string;
      origin: {
        flightPlaceId: string;
        displayCode: string;
        parent: {
          flightPlaceId: string;
          displayCode: string;
          name: string;
          type: string;
        };
        name: string;
        type: string;
        country: string;
      };
      destination: {
        flightPlaceId: string;
        displayCode: string;
        parent: {
          flightPlaceId: string;
          displayCode: string;
          name: string;
          type: string;
        };
        name: string;
        type: string;
        country: string;
      };
      departure: string;
      arrival: string;
      durationInMinutes: number;
      flightNumber: string;
      marketingCarrier: {
        id: number;
        name: string;
        alternateId: string;
        allianceId: number;
        displayCode: string;
      };
      operatingCarrier: {
        id: number;
        name: string;
        alternateId: string;
        allianceId: number;
        displayCode: string;
      };
    }>;
  }>;
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  eco: {
    ecoContenderDelta: number;
  };
  fareAttributes: Record<string, unknown>;
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface IFlights {
    itineraries: Itinerary[];
}