// Export an empty object to ensure this file is treated as a module
export {};

// Declare `initMap` globally to avoid TypeScript errors
declare global {
  interface Window {
    initMap: () => void;
  }
}

// Define `initMap` function globally
window.initMap = function (): void {
  // Placeholder for Google Maps initialization
  console.log('Google Maps initialization logic goes here.');
};

// Query elements
const menuItems = document.querySelectorAll('.menu-item');
const screens = document.querySelectorAll('main.content');
const tripForm = document.getElementById('trip-form') as HTMLFormElement;
const errorMessage = document.getElementById('error-message') as HTMLElement; // Error message element

// Function to switch screens
function switchScreen(targetScreenId: string): void {
  screens.forEach((screen) => {
    if (screen.id === targetScreenId) {
      screen.classList.remove('hidden');
    } else {
      screen.classList.add('hidden');
    }
  });
}

// Menu item click events
menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    const targetScreen = item.getAttribute('data-screen');
    if (targetScreen) {
      switchScreen(targetScreen);
    }
  });
});

// Handle "Plan My Trip" form submission
tripForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Retrieve form values
  const start = (
    document.getElementById('start') as HTMLInputElement
  ).value.trim();
  const destination = (
    document.getElementById('destination') as HTMLInputElement
  ).value.trim();
  const range = parseFloat(
    (document.getElementById('range') as HTMLInputElement).value,
  );

  // Validate form inputs
  if (!start || !destination || isNaN(range) || range <= 0) {
    // Show error message and prevent further action
    errorMessage.textContent = 'Please enter valid information in all fields.';
    errorMessage.style.display = 'block'; // Show error message
    return; // Stop further execution
  } else {
    // Hide error message if the inputs are valid
    errorMessage.style.display = 'none'; // Hide error message
  }

  // Transition to map screen if validation passes
  generateTripMap(start, destination, range);
});

// Function to generate trip map and display it
function generateTripMap(
  start: string,
  destination: string,
  range: number,
): void {
  // Update the existing map section with trip details
  const mapSection = document.getElementById('map-display-screen')!;
  const mapContainer = document.getElementById('map')!;
  const stationsInfo = document.getElementById('stations-info')!;

  // Display trip details (starting point, destination, range)
  mapSection.querySelector('h2')!.textContent = 'Trip Details';
  mapContainer.innerHTML = ''; // Clear any previous map content

  // Display the starting point, destination, and vehicle range
  stationsInfo.innerHTML = `
    <h3>Stations on the Route</h3>
    <p>Total Stations: <span id="stations-count">0</span></p>
    <ul id="stations-list"></ul>
  `;

  const tripDetails = document.createElement('p');
  tripDetails.innerHTML = `
    Starting Point: ${start} <br>
    Destination: ${destination} <br>
    Vehicle Range: ${range} miles
  `;

  mapContainer.appendChild(tripDetails);

  // Switch to the map screen (same structure)
  switchScreen('map-display-screen');

  // Initialize the map (replace with actual Google Maps API logic)
  if (typeof window.initMap === 'function') {
    window.initMap();
  } else {
    alert('Map functionality not yet implemented.');
  }
}
