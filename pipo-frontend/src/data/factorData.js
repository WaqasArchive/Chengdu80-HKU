import creditData from "./creditData";
import creditDataKeys from "./creditDataKeys";

function getRandomArbitrary(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

const values = {};
for (const key in creditDataKeys) {
  values[key] = {};
  for (const i in creditDataKeys[key].options) {
    values[key][creditDataKeys[key].options[i]] = 0;
  }
}
creditData.forEach(item => {
  for (const key in creditDataKeys) {
    values[key][creditDataKeys[key].options[item[key]]] += item.avg_credit_card_spending_semi_annual;
  }
});

const months = ["Nov", "Dec", "Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct"];
export const factorDistributionData = {};
export const factorPerformanceData = {};
for (const key in values) {
  factorDistributionData[creditDataKeys[key].name] = values[key];
  factorPerformanceData[creditDataKeys[key].name] = [];
  for (const option in values[key]) {
    factorPerformanceData[creditDataKeys[key].name].push(months.map(month => ({x: month, y: getRandomArbitrary(800,1000)})));
  }
}
