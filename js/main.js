'use strict';
/// <reference types="leaflet" />
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var savedTrips = [];
// Leaflet map instance
var map;
// Initialize Leaflet Map
function initMap() {
  map = L.map('map').setView([37.7749, -122.4194], 8); // Centered on San Francisco
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}
// Call initMap on page load
document.addEventListener('DOMContentLoaded', function () {
  initMap();
});
var saveTripButtonError = document.getElementById('save-trip-button');
saveTripButtonError.onclick = function () {
  // Show confirmation and update the saved trips display
  alert('There are no trips found! Go back to the Home Page');
  renderSavedTrips();
};
// Add markers for a trip
function addMarkers(startCoordinates, destinationCoordinates) {
  // Remove existing markers
  map.eachLayer(function (layer) {
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
  var bounds = L.latLngBounds(startCoordinates, destinationCoordinates);
  map.fitBounds(bounds);
}
// Geocoding function
function geocodeAddress(address) {
  return __awaiter(this, void 0, void 0, function () {
    var response, results;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            fetch(
              'https://nominatim.openstreetmap.org/search?format=json&q='.concat(
                encodeURIComponent(address),
              ),
            ),
          ];
        case 1:
          response = _a.sent();
          return [4 /*yield*/, response.json()];
        case 2:
          results = _a.sent();
          if (!results || results.length === 0) {
            throw new Error('Address not found: '.concat(address));
          }
          return [
            2 /*return*/,
            [parseFloat(results[0].lat), parseFloat(results[0].lon)],
          ];
      }
    });
  });
}
// Simulated charging stations along route
function getChargingStationsAlongRoute() {
/*start: [number, number],
end: [number, number],
range: number,*/
  // Simulated data
  return [
    { name: 'Station 1', coordinates: [36.7783, -119.4179] },
    { name: 'Station 2', coordinates: [35.3733, -119.0187] },
  ];
}
// Handle trip form submission
var tripForm = document.getElementById('trip-form');
tripForm.addEventListener('submit', function (e) {
  return __awaiter(void 0, void 0, void 0, function () {
    var start,
      destination,
      rangeInput,
      range,
      errorMessage,
      startCoordinates,
      destinationCoordinates,
      stations,
      tripData,
      error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          e.preventDefault();
          start = document.getElementById('start').value.trim();
          destination = document.getElementById('destination').value.trim();
          rangeInput = document.getElementById('range').value;
          range = parseFloat(rangeInput);
          errorMessage = document.getElementById('error-message');
          errorMessage.textContent = '';
          if (!start || !destination || isNaN(range) || range <= 0) {
            console.error('Invalid inputs:', {
              start: start,
              destination: destination,
              range: range,
            });
          } else {
            console.log(
              'Traveling from '
                .concat(start, ' to ')
                .concat(destination, ' within a range of ')
                .concat(range, ' miles.'),
            );
          }
          _a.label = 1;
        case 1:
          _a.trys.push([1, 4, , 5]);
          return [4 /*yield*/, geocodeAddress(start)];
        case 2:
          startCoordinates = _a.sent();
          return [4 /*yield*/, geocodeAddress(destination)];
        case 3:
          destinationCoordinates = _a.sent();
          stations = getChargingStationsAlongRoute();
          addMarkers(startCoordinates, destinationCoordinates);
          displayStationList(stations);
          tripData = {
            start: start,
            destination: destination,
            range: range,
            stations: stations,
            startCoordinates: startCoordinates,
            destinationCoordinates: destinationCoordinates,
          };
          // Pass trip data to the map screen and display the "Save Trip" button
          setupSaveTripButton(tripData);
          // Switch screen to show map and navigation
          switchScreen('map-screen');
          return [3 /*break*/, 5];
        case 4:
          error_1 = _a.sent();
          errorMessage.textContent = error_1.message;
          return [3 /*break*/, 5];
        case 5:
          return [2 /*return*/];
      }
    });
  });
});
function setupSaveTripButton(tripData) {
  var saveTripButton = document.getElementById('save-trip-button');
  saveTripButton.onclick = function () {
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
var savedTripsList = document.getElementById('saved-trips-list');
function renderSavedTrips() {
  savedTripsList.innerHTML = savedTrips
    .map(function (trip, index) {
      return '<li>\n          '
        .concat(trip.start, ' to ')
        .concat(trip.destination, ' (')
        .concat(trip.range, ' miles)\n          <button onclick="startTrip(')
        .concat(
          index,
          ')">Start Trip</button>\n          <button onclick="deleteTrip(',
        )
        .concat(index, ')">\u274C</button>\n        </li>');
    })
    .join('');
}
// Start trip
window.startTrip = function (index) {
  var trip = savedTrips[index];
  alert('Starting trip: '.concat(trip.start, ' to ').concat(trip.destination));
  // Switch screen to show map and navigation
  switchScreen('map-screen');
};
// Delete trip
window.deleteTrip = function (index) {
  savedTrips.splice(index, 1);
  renderSavedTrips();
  alert('Oh No!! Trip has been Removed from your list!');
};
// Display charging station list
function displayStationList(stations) {
  var stationList = document.getElementById('station-list');
  stationList.innerHTML = stations
    .map(function (station) {
      return '<li>\n          <strong>'
        .concat(station.name, '</strong>\n          (Lat: ')
        .concat(station.coordinates[0].toFixed(2), ', Lon: ')
        .concat(station.coordinates[1].toFixed(2), ')\n        </li>');
    })
    .join('');
}
// Screen switching logic
var screens = document.querySelectorAll('main.content');
function switchScreen(targetScreenId) {
  screens.forEach(function (screen) {
    screen.classList.toggle('hidden', screen.id !== targetScreenId);
  });
}
// Menu logic
var menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(function (item) {
  return item.addEventListener('click', function () {
    return switchScreen(item.getAttribute('data-screen'));
  });
});
// Function to display a success message when saving settings
function saveSettings() {
  var saveMessage = document.getElementById('save-message');
  saveMessage.textContent = 'You are all set!';
  saveMessage.classList.remove('hidden');
  // Hide the message after a few seconds
  setTimeout(function () {
    saveMessage.classList.add('hidden');
  }, 3000); // Adjust the timeout duration as needed
}
// Attach the event listener to the save button
var saveButton = document.getElementById('save-settings');
if (saveButton) {
  saveButton.addEventListener('click', saveSettings);
}
