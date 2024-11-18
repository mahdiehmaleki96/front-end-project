// Interfaces for Data Model

interface Station {
  id: string;
  name: string;
  address: string;
  connectorType: string;
  chargingSpeed: string;
}

interface Trip {
  start: string;
  destination: string;
  range: number;
  stations: Station[];
}

// Saved Trips Array
let savedTrips: Trip[] = [];

// Save trips to localStorage
function saveTripsToLocalStorage(): void {
  localStorage.setItem('savedTrips', JSON.stringify(savedTrips));
}

// Load trips from localStorage
function loadTripsFromLocalStorage(): void {
  const data = localStorage.getItem('savedTrips');
  if (data) {
    savedTrips = JSON.parse(data);
  }
}

// Save a new trip
function saveNewTrip(trip: Trip): void {
  savedTrips.push(trip);
  saveTripsToLocalStorage();
}

// Get all saved trips
function getSavedTrips(): Trip[] {
  loadTripsFromLocalStorage();
  return savedTrips;
}

// Example Usage
const exampleTrip: Trip = {
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
