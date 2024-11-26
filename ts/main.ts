/// <reference types="leaflet" />

// Define saved trips type and array
interface Trip {
  start: string;
  destination: string;
  range: number;
}

const savedTrips: Trip[] = [];

// Leaflet map instance
let map: L.Map;

// Initialize Leaflet Map
function initMap(): void {
  map = L.map('map').setView([37.7749, -122.4194], 8); // Centered on San Francisco

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}

// Call initMap on page load
document.addEventListener('DOMContentLoaded', () => {
  initMap();
});

const saveTripButtonError = document.getElementById(
  'save-trip-button',
) as HTMLButtonElement;

saveTripButtonError.onclick = (): void => {
  // Show confirmation and update the saved trips display
  alert('There are no trips found! Go back to the Home Page');
  renderSavedTrips();
};

// Add markers for a trip
function addMarkers(
  startCoordinates: [number, number],
  destinationCoordinates: [number, number],
): void {
  // Remove existing markers
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Add start and destination markers
  L.marker(startCoordinates).addTo(map).bindPopup('Start Location').openPopup();
  L.marker(destinationCoordinates)
    .addTo(map)
    .bindPopup('Destination')
    .openPopup();

  // Fit map to bounds
  const bounds = L.latLngBounds(startCoordinates, destinationCoordinates);
  map.fitBounds(bounds);
}

// Geocoding function
async function geocodeAddress(address: string): Promise<[number, number]> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address,
    )}`,
  );
  const results = await response.json();
  if (!results || results.length === 0) {
    throw new Error(`Address not found: ${address}`);
  }
  return [parseFloat(results[0].lat), parseFloat(results[0].lon)];
}

// Simulated charging stations along route
function getChargingStationsAlongRoute(): Array<{
  name: string;
  coordinates: [number, number];
}> {
  // Simulated data
  return [
    { name: 'Station 1', coordinates: [36.7783, -119.4179] },
    { name: 'Station 2', coordinates: [35.3733, -119.0187] },
  ];
}

// Handle trip form submission
const tripForm = document.getElementById('trip-form') as HTMLFormElement;

tripForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const start = (
    document.getElementById('start') as HTMLInputElement
  ).value.trim();
  const destination = (
    document.getElementById('destination') as HTMLInputElement
  ).value.trim();
  const rangeInput = (document.getElementById('range') as HTMLInputElement)
    .value;
  const range = parseFloat(rangeInput);

  const errorMessage = document.getElementById('error-message')!;
  errorMessage.textContent = '';

  if (!start || !destination || isNaN(range) || range <= 0) {
    console.error('Invalid inputs:', { start, destination, range });
  } else {
    console.log(
      `Traveling from ${start} to ${destination} within a range of ${range} miles.`,
    );
  }

  try {
    const startCoordinates = await geocodeAddress(start);
    const destinationCoordinates = await geocodeAddress(destination);

    const stations = getChargingStationsAlongRoute();

    addMarkers(startCoordinates, destinationCoordinates);
    displayStationList(stations);

    // Store the trip data temporarily (do not save yet)
    const tripData = {
      start,
      destination,
      range,
      stations,
      startCoordinates,
      destinationCoordinates,
    };

    // Pass trip data to the map screen and display the "Save Trip" button
    setupSaveTripButton(tripData);

    // Switch screen to show map and navigation
    switchScreen('map-screen');
  } catch (error) {
    errorMessage.textContent = (error as Error).message;
  }
});

function setupSaveTripButton(
  tripData: Trip & {
    stations: any[];
    startCoordinates: [number, number];
    destinationCoordinates: [number, number];
  },
): void {
  const saveTripButton = document.getElementById(
    'save-trip-button',
  ) as HTMLButtonElement;

  saveTripButton.onclick = (): void => {
    // Add the trip to saved trips
    savedTrips.push({
      start: tripData.start,
      destination: tripData.destination,
      range: tripData.range,
    });

    // Show confirmation and update the saved trips display
    alert('Your trip has been successfully saved!');
    renderSavedTrips();
  };
}

// Render saved trips
const savedTripsList = document.getElementById('saved-trips-list')!;
function renderSavedTrips(): void {
  savedTripsList.innerHTML = savedTrips
    .map(
      (trip, index) =>
        `<li>
          ${trip.start} to ${trip.destination} (${trip.range} miles)
          <button onclick="startTrip(${index})">Start Trip</button>
          <button onclick="deleteTrip(${index})">❌</button>
        </li>`,
    )
    .join('');
}

// Start trip
(window as any).startTrip = (index: number): void => {
  const trip = savedTrips[index];
  alert(`Starting trip: ${trip.start} to ${trip.destination}`);
  // Switch screen to show map and navigation
  switchScreen('map-screen');
};

// Delete trip
(window as any).deleteTrip = (index: number): void => {
  savedTrips.splice(index, 1);
  renderSavedTrips();
  alert('Oh No!! Trip has been Removed from your list!');
};

// Display charging station list
function displayStationList(
  stations: Array<{ name: string; coordinates: [number, number] }>,
): void {
  const stationList = document.getElementById('station-list')!;
  stationList.innerHTML = stations
    .map(
      (station) =>
        `<li>
          <strong>${station.name}</strong>
          (Lat: ${station.coordinates[0].toFixed(2)}, Lon: ${station.coordinates[1].toFixed(2)})
        </li>`,
    )
    .join('');
}

// Screen switching logic
const screens = document.querySelectorAll('main.content');
function switchScreen(targetScreenId: string): void {
  screens.forEach((screen) => {
    screen.classList.toggle('hidden', screen.id !== targetScreenId);
  });
}

// Menu logic
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach((item) =>
  item.addEventListener('click', () =>
    switchScreen(item.getAttribute('data-screen')!),
  ),
);

// Function to display a success message when saving settings
function saveSettings(): void {
  const saveMessage = document.getElementById('save-message')!;
  saveMessage.textContent = 'You are all set!';
  saveMessage.classList.remove('hidden');

  // Hide the message after a few seconds
  setTimeout(() => {
    saveMessage.classList.add('hidden');
  }, 3000); // Adjust the timeout duration as needed
}

// Attach the event listener to the save button
const saveButton = document.getElementById(
  'save-settings',
) as HTMLButtonElement;
if (saveButton) {
  saveButton.addEventListener('click', saveSettings);
}
