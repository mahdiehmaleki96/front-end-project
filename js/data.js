'use strict';
// Saved Trips Array
let savedTrips = [];
// Save trips to localStorage
function saveTripsToLocalStorage() {
  localStorage.setItem('savedTrips', JSON.stringify(savedTrips));
}
// Load trips from localStorage
function loadTripsFromLocalStorage() {
  const data = localStorage.getItem('savedTrips');
  if (data) {
    savedTrips = JSON.parse(data);
  }
}
// Save a new trip
function saveNewTrip(trip) {
  savedTrips.push(trip);
  saveTripsToLocalStorage();
}
// Get all saved trips
function getSavedTrips() {
  loadTripsFromLocalStorage();
  return savedTrips;
}
// Example Usage
const exampleTrip = {
  start: 'Los Angeles, CA',
  destination: 'San Francisco, CA',
  range: 250,
  stations: [
    {
      id: '1',
      name: 'EV Charging Station A',
      address: '123 Main St, Los Angeles, CA',
      connectorType: 'Type 2',
      chargingSpeed: 'Fast',
    },
    {
      id: '2',
      name: 'EV Charging Station B',
      address: '456 Elm St, Bakersfield, CA',
      connectorType: 'CCS',
      chargingSpeed: 'Rapid',
    },
  ],
};
// Save and retrieve trips for testing
saveNewTrip(exampleTrip);
console.log(getSavedTrips());
