export function getRandomData(numPoints, center, min, max, cycles) {
  const result = [];
  //const phase = Math.random() * Math.PI;
  let y = center;

  function randomPlusMinus() { return (Math.random() * 2) - 1; }

  cycles.forEach((thisCycle,i) => {
    cycles[i].phase = Math.random() * Math.PI;
    cycles[i].increment = Math.PI / thisCycle.length;
  });

  for (let i = 0; i < numPoints; i++) {
    // eslint-disable-next-line
    cycles.forEach((thisCycle,i) => {
      // eslint-disable-next-line
      cycles[i].phase += cycles[i].increment * randomPlusMinus();
      // eslint-disable-next-line
      y += (Math.sin(thisCycle.phase) *
        (thisCycle.variance / thisCycle.length) * (randomPlusMinus() * thisCycle.noise)) + (thisCycle.trend / thisCycle.length);
    });
    if (min) {y = Math.max(y,min);}
    if (max) {y = Math.min(y,max);}
    result.push(y);
  }

  return result;
}
export const EntityData = [];
const data = [
  {
    "id": 1,
    "full_name": "Piyush Jha",
    "symbol": "PIJH",
    "current_price": 20.21,
    "shares_owned": "1,231",
  },
  {
    "id": 2,
    "full_name": "Waqas Ali",
    "symbol": "WAAL",
    "current_price": 29.11,
    "shares_owned": "832",
  },
  {
    "id": 3,
    "full_name": "Gabriel Match",
    "symbol": "GAMA",
    "current_price": 98.91,
    "shares_owned": "50,000",
  },
  {
    "id": 4,
    "full_name": "David Hang",
    "symbol": "DAHA",
    "current_price": 56.73,
    "shares_owned": "25,000",
  },
];

data.forEach(entity => {
  entity.performance = getRandomData(31,80,20,100,
    [{length: 2, variance: 50, noise: 1, trend: 0},
      {length: 31, variance: 30, noise: 1, trend: 0},
      {length: 60, variance: 2, noise: 0, trend: 100}]).map((i,index) => ({x: index, y: i}));
  EntityData.push(entity);
});
