// data.js
// Minimal starter schema; you can grow this infinitely without breaking the app.
const DATA = {
  groups: [
    { id: 'bass', name: 'Bass' },
    { id: 'panfish', name: 'Panfish' },
    { id: 'catfish', name: 'Catfish' },
    { id: 'cichlids', name: 'Cichlids' },
    { id: 'salmonids', name: 'Trout & Salmon' },
    { id: 'moronidae', name: 'Striped/Temperate Basses' },
    { id: 'serranidae', name: 'Sea Basses & Groupers' },
    { id: 'pelagics', name: 'Pelagics' },
    // ...add as many groups as you want
  ],

  // Each species belongs to exactly one "display group" for UX (you decide where)
  // You can still note true families in meta if you want.
  species: [
    {
      id: 'fw-largemouth-bass',
      name: 'Largemouth Bass',
      groups: ['bass'],                  // belongs to “Bass” group in UI
      habitats: ['freshwater'],          // can be ['freshwater','saltwater'] if both
      continents: ['NA'],                // UN-style code or custom: NA, SA, EU, AF, AS, OC
      countries: ['US','MX','CA'],       // ISO-3166-1 alpha-2
      states: ['US-FL','US-GA','US-AL','US-NC','US-TX', 'US-CA'], // ISO-3166-2
      // optional image
      img: 'img/fw-largemouth-bass.png'
    },
    {
      id: 'sw-striped-bass',
      name: 'Striped Bass',
      groups: ['moronidae','bass'],      // appears in multiple groups if you want
      habitats: ['freshwater','saltwater'], // anadromous
      continents: ['NA'],
      countries: ['US','CA'],
      states: ['US-MA','US-CT','US-NY','US-NJ','US-DE','US-MD','US-VA','US-NC','US-SC'],
      img: 'img/sw-striped-bass.png'
    },
    {
      id: 'sw-red-drum',
      name: 'Red Drum',
      groups: ['inshore','drums'],       // if you create those groups
      habitats: ['saltwater'],
      continents: ['NA'],
      countries: ['US','MX'],
      states: ['US-FL','US-GA','US-SC','US-NC','US-VA','US-TX','US-LA','US-MS','US-AL'],
      img: 'img/sw-red-drum.png'
    },
    // ...add thousands as needed
  ]
};
