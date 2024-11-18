'use strict';
// Function to switch between screens
function showScreen(screenId) {
  var _a;
  var allScreens = document.querySelectorAll('.content');
  allScreens.forEach(function (screen) {
    return screen.classList.add('hidden');
  });
  (_a = document.getElementById(screenId)) === null || _a === void 0
    ? void 0
    : _a.classList.remove('hidden');
}
// Handle 'Plan My Trip' submission
var tripForm = document.getElementById('trip-form');
tripForm.addEventListener('submit', function (event) {
  event.preventDefault();
  // Extract form inputs
  var start = document.getElementById('start').value;
  var destination = document.getElementById('destination').value;
  var range = document.getElementById('range').value;
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
function displayMap(start, destination) {
  var mapContainer = document.getElementById('map-container');
  if (mapContainer) {
    mapContainer.innerHTML = '\n      <p>Showing route from <strong>'
      .concat(start, '</strong> to <strong>')
      .concat(
        destination,
        '</strong>.</p>\n      <p>[Map Placeholder]</p>\n    ',
      );
  }
}
// Display charging stations (mock data)
function displayStations() {
  var stations = [
    { name: 'Station 1', address: '123 Main St', distance: '2 miles' },
    { name: 'Station 2', address: '456 Elm St', distance: '5 miles' },
    { name: 'Station 3', address: '789 Oak St', distance: '10 miles' },
  ];
  var stationsList = document.getElementById('stations-list');
  if (stationsList) {
    stationsList.innerHTML = stations
      .map(function (station) {
        return '\n      <li>\n        <strong>'
          .concat(station.name, '</strong><br />\n        Address: ')
          .concat(station.address, '<br />\n        Distance: ')
          .concat(station.distance, '\n      </li>\n    ');
      })
      .join('');
  }
}
// Menu navigation
var menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(function (menuItem) {
  menuItem.addEventListener('click', function () {
    var targetScreen = menuItem.getAttribute('data-screen');
    if (targetScreen) {
      showScreen(targetScreen);
    }
  });
});
