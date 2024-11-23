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
  event.preventDefault();

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
    alert('Please enter valid information in all fields.');
    return;
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
  // Hide the home screen
  switchScreen('home-screen');

  // Dynamically create the map screen if it doesn't already exist
  let mapScreen = document.getElementById('map-screen');
  if (!mapScreen) {
    mapScreen = document.createElement('main');
    mapScreen.classList.add('content');
    mapScreen.id = 'map-screen';
    mapScreen.innerHTML = `
      <h2>Map</h2>
      <p>Starting Point: ${start}</p>
      <p>Destination: ${destination}</p>
      <p>Vehicle Range: ${range} miles</p>
      <div id="map" style="height: 500px; width: 100%;"></div>
    `;
    document.body.appendChild(mapScreen);
  }

  // Switch to the map screen
  switchScreen('map-screen');

  // Initialize the map (replace with actual Google Maps API logic)
  if (typeof window.initMap === 'function') {
    window.initMap();
  } else {
    alert('Map functionality not yet implemented.');
  }
}
