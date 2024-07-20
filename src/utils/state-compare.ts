const stateDistances = [
  { state: "Rhode Island", distance: 48 },
  { state: "Delaware", distance: 96 },
  { state: "Connecticut", distance: 110 },
  { state: "New Jersey", distance: 170 },
  { state: "New Hampshire", distance: 190 },
  { state: "Vermont", distance: 160 },
  { state: "Massachusetts", distance: 190 },
  { state: "Hawaii", distance: 150 },
  { state: "Maryland", distance: 250 },
  { state: "West Virginia", distance: 240 },
  { state: "South Carolina", distance: 260 },
  { state: "Maine", distance: 320 },
  { state: "Alabama", distance: 330 },
  { state: "Louisiana", distance: 280 },
  { state: "Mississippi", distance: 340 },
  { state: "New York", distance: 330 },
  { state: "Pennsylvania", distance: 310 },
  { state: "Ohio", distance: 220 },
  { state: "Tennessee", distance: 440 },
  { state: "Kentucky", distance: 390 },
  { state: "Indiana", distance: 270 },
  { state: "Arizona", distance: 390 },
  { state: "Oklahoma", distance: 400 },
  { state: "Florida", distance: 450 },
  { state: "Wisconsin", distance: 310 },
  { state: "Iowa", distance: 310 },
  { state: "Illinois", distance: 390 },
  { state: "Minnesota", distance: 410 },
  { state: "Missouri", distance: 300 },
  { state: "Arkansas", distance: 280 },
  { state: "North Carolina", distance: 500 },
  { state: "Michigan", distance: 360 },
  { state: "Georgia", distance: 300 },
  { state: "Virginia", distance: 430 },
  { state: "North Dakota", distance: 340 },
  { state: "Kansas", distance: 410 },
  { state: "Nebraska", distance: 430 },
  { state: "Colorado", distance: 380 },
  { state: "Nevada", distance: 320 },
  { state: "Oregon", distance: 360 },
  { state: "New Mexico", distance: 370 },
  { state: "South Dakota", distance: 380 },
  { state: "Montana", distance: 550 },
  { state: "Wyoming", distance: 280 },
  { state: "Idaho", distance: 480 },
  { state: "Utah", distance: 350 },
  { state: "California", distance: 810 },
  { state: "Texas", distance: 801 },
  { state: "Alaska", distance: 1420 },
  // Add other states if necessary
];

export function compareHamsterRunToStates(miles: number) {
  let comparison = "";

  for (const { state, distance } of stateDistances) {
    if (miles >= distance) {
      comparison = `My hamster has run ${miles.toFixed(
        0
      )} miles, which is more than the distance across ${state} (${distance} miles)!`;
    } else {
      const percentage = ((miles / distance) * 100).toFixed(2);
      comparison = `My hamster has run ${miles.toFixed(
        0
      )} miles, which is about ${percentage}% of the distance across ${state} (${distance} miles).`;
      break;
    }
  }

  return comparison;
}
