// Data.ts

export interface Station {
  name: string;
  address: string;
  distance: string;
}

// Mock data for charging stations
export const stations: Station[] = [
  {
    name: 'Rapid Charge Station 1',
    address: '123 Greenway Blvd',
    distance: '2 miles',
  },
  {
    name: 'EV Go Hub',
    address: '456 Power Ave',
    distance: '5 miles',
  },
  {
    name: 'Charge+ Station',
    address: '789 Volt Lane',
    distance: '8 miles',
  },
];
