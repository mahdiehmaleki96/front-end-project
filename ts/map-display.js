'use strict';
let map;
let directionsService;
let directionsRenderer;
function initMap() {
  var _a;
  // Create the map
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
    zoom: 12,
  });
  // Create the Directions service and renderer
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  // Add event listener for route request
  (_a = document.getElementById('plan-trip')) === null || _a === void 0
    ? void 0
    : _a.addEventListener('click', () => {
        const start = document.getElementById('start-point').value;
        const end = document.getElementById('end-point').value;
        if (start && end) {
          getRoute(start, end);
          findEVStationsAlongRoute();
        }
      });
}
// Fetch route directions between start and end points
function getRoute(start, end) {
  const request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING,
  };
  directionsService.route(request, (response, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(response);
    } else {
      console.error('Directions request failed due to ' + status);
    }
  });
}
// Fetch EV charging stations along the route
function findEVStationsAlongRoute() {
  const service = new google.maps.places.PlacesService(map);
  const request = {
    location: map.getCenter(),
    radius: 50000, // radius to search for stations
    type: 'electric_vehicle_charging_station',
  };
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const stationList = document.getElementById('station-list');
      if (stationList) {
        stationList.innerHTML = ''; // Clear existing list
        if (results && results.length > 0) {
          results.forEach((station) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${station.name}</strong> - ${station.vicinity}`;
            stationList.appendChild(li); // Optional chaining not needed here
          });
        } else {
          console.error('No stations found or results are invalid.');
        }
      } else {
        console.error('Station list element not found.');
      }
    } else {
      console.error('Places search failed due to status: ' + status);
    }
  });
}
// This binds the initMap function to the window object for the callback
window.initMap = initMap;