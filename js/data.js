// Interfaces for Data Model
// Saved Trips Array
var savedTrips = [];
// Fetch stations on route
export function getStationsOnRoute(range) {
  // Mock data - replace with actual API call or logic
  var allStations = [
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
  return allStations.filter(function (station) {
    return station.distanceFromStart <= range;
  });
}
// Example Trip Data
var currentTrip = {
  start: 'Los Angeles, CA',
  destination: 'San Francisco, CA',
  range: 250,
  stations: getStationsOnRoute(250),
};
// Save and retrieve trips for testing
savedTrips.push(currentTrip);
