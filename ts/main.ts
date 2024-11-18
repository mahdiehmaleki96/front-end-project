// Function to switch between screens
function showScreen(screenId: string): void {
  const allScreens = document.querySelectorAll('.content');
  allScreens.forEach((screen) => screen.classList.add('hidden'));
  document.getElementById(screenId)?.classList.remove('hidden');
}

// Handle 'Plan My Trip' submission
const tripForm = document.getElementById('trip-form') as HTMLFormElement;
tripForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Extract form inputs
  const start = (document.getElementById('start') as HTMLInputElement).value;
  const destination = (
    document.getElementById('destination') as HTMLInputElement
  ).value;
  const range = (document.getElementById('range') as HTMLInputElement).value;

  // Validate inputs
  if (!start || !destination || !range) {
    alert('Please fill out all fields.');
    return;
  }

  // Navigate to Map Screen
  showScreen('map-screen');

  // Mock data: Populate map and stations
  displayMap(start, destination);
  displayStations();
});

// Display map (placeholder)
function displayMap(start: string, destination: string): void {
  const mapContainer = document.getElementById('map-container');
  if (mapContainer) {
    mapContainer.innerHTML = `
      <p>Showing route from <strong>${start}</strong> to <strong>${destination}</strong>.</p>
      <p>[Map Placeholder]</p>
    `;
  }
}

// Display charging stations (mock data)
function displayStations(): void {
  const stations = [
    { name: 'Station 1', address: '123 Main St', distance: '2 miles' },
    { name: 'Station 2', address: '456 Elm St', distance: '5 miles' },
    { name: 'Station 3', address: '789 Oak St', distance: '10 miles' },
  ];

  const stationsList = document.getElementById('stations-list');
  if (stationsList) {
    stationsList.innerHTML = stations
      .map(
        (station) => `
      <li>
        <strong>${station.name}</strong><br />
        Address: ${station.address}<br />
        Distance: ${station.distance}
      </li>
    `,
      )
      .join('');
  }
}

// Menu navigation
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach((menuItem) => {
  menuItem.addEventListener('click', () => {
    const targetScreen = menuItem.getAttribute('data-screen');
    if (targetScreen) {
      showScreen(targetScreen);
    }
  });
});
