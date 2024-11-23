// Interfaces for Data Model

export interface Station {
  id: string;
  name: string;
  address: string;
  connectorType: string;
  chargingSpeed: string;
  distanceFromStart: number; // Distance from the start in miles
}

export interface Trip {
  start: string;
  destination: string;
  range: number;
  stations: Station[];
}

// Saved Trips Array
const savedTrips: Trip[] = [];

// Fetch stations on route
export function getStationsOnRoute(range: number): Station[] {
  // Mock data - replace with actual API call or logic
  const allStations: Station[] = [
    {
      id: '1',
      name: 'Station A',
      address: '123 Main St, Start City',
      connectorType: 'Type 2',
      chargingSpeed: 'Fast',
      distanceFromStart: 100,
    },
    {
      id: '2',
      name: 'Station B',
      address: '456 Elm St, Midpoint City',
      connectorType: 'CCS',
      chargingSpeed: 'Rapid',
      distanceFromStart: 200,
    },
    {
      id: '3',
      name: 'Station C',
      address: '789 Oak St, Near Destination',
      connectorType: 'CHAdeMO',
      chargingSpeed: 'Fast',
      distanceFromStart: 300,
    },
  ];

  // Filter stations based on range
  return allStations.filter((station) => station.distanceFromStart <= range);
}

// Example Trip Data
const currentTrip: Trip = {
  start: 'Los Angeles, CA',
  destination: 'San Francisco, CA',
  range: 250,
  stations: getStationsOnRoute(250),
};

// Save and retrieve trips for testing
savedTrips.push(currentTrip);
