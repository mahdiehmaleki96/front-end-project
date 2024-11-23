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

// LocalStorage Key
const LOCAL_STORAGE_KEY = 'evTripPlanner_savedTrips';

// Save trips to localStorage
function saveTripsToLocalStorage(): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedTrips));
  } catch (error) {
    console.error('Failed to save trips to localStorage:', error);
  }
}

// Load trips from localStorage
function loadTripsFromLocalStorage(): void {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        savedTrips = parsedData as Trip[]; // Ensure data matches the Trip[] type
      } else {
        console.warn('Invalid data format in localStorage. Resetting trips.');
        savedTrips = [];
      }
    }
  } catch (error) {
    console.error('Failed to load trips from localStorage:', error);
    savedTrips = [];
  }
}

// Save a new trip
function saveNewTrip(trip: Trip): void {
  if (validateTrip(trip)) {
    savedTrips.push(trip);
    saveTripsToLocalStorage();
  } else {
    console.error('Invalid trip data. Trip not saved.');
  }
}

// Get all saved trips
function getSavedTrips(): Trip[] {
  loadTripsFromLocalStorage();
  return savedTrips;
}

// Validate trip data
function validateTrip(trip: Trip): boolean {
  return (
    typeof trip.start === 'string' &&
    typeof trip.destination === 'string' &&
    typeof trip.range === 'number' &&
    trip.range > 0 &&
    Array.isArray(trip.stations) &&
    trip.stations.every(validateStation)
  );
}

// Validate station data
function validateStation(station: Station): boolean {
  return (
    typeof station.id === 'string' &&
    typeof station.name === 'string' &&
    typeof station.address === 'string' &&
    typeof station.connectorType === 'string' &&
    typeof station.chargingSpeed === 'string'
  );
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

// Test saving and retrieving trips
saveNewTrip(exampleTrip);
console.log(getSavedTrips());
