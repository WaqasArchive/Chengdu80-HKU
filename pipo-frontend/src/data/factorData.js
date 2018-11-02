import creditData from "./creditData";
import creditDataKeys from "./creditDataKeys";
import {getRandomData} from "./entityData";

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

//const months = ["Nov", "Dec", "Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct"];
export const factorDistributionData = {};
export const factorPerformanceData = {};
for (const key in values) {
  factorDistributionData[creditDataKeys[key].name] = values[key];
  factorPerformanceData[creditDataKeys[key].name] = [];
  for (const option in values[key]) {
    if (option) {
      factorPerformanceData[creditDataKeys[key].name].push(getRandomData(365,80,20,100,
        [{length: 7, variance: 50, noise: 1, trend: 0},
          {length: 365, variance: 30, noise: 1, trend: 0},
          {length: 700, variance: 2, noise: 0, trend: 100}]).map((i,index) => ({x: index, y: i})));
    }
  }
}
