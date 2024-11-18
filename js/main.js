'use strict';
// Query elements
const menuItems = document.querySelectorAll('.menu-item');
const screens = document.querySelectorAll('main.content');
const tripForm = document.getElementById('trip-form');
// Function to switch screens
function switchScreen(targetScreenId) {
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
// Handle "Plan My Trip" submission
tripForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const start = document.getElementById('start').value;
  const destination = document.getElementById('destination').value;
  if (start && destination) {
    // Transition to map screen
    generateTripMap(start, destination);
  }
});
// Mock function for map generation and station preview
function generateTripMap(start, destination) {
  switchScreen('home-screen'); // Replace this with actual map screen logic
  alert(`Generating map from ${start} to ${destination}`);
}
