import React from 'react';
//import ShowcaseButton from '../showcase-components/showcase-button';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  VerticalBarSeriesCanvas
} from 'react-vis';
//import * as myDATA from './csvjson.json';

const myDATA = [
  {y: 45.52, x: 28},
  {y: 47.11, x: 31},
  {y: 23.25, x: 41},
  {y: 47.11, x: 31},
  {y: 19.82, x: 93},
  {y: 43.98, x: 76},
  {y: 22.72, x: 89},
  {y: 25.61, x: 52},
  {y: 26.99, x: 16},
  {y: 21.17, x: 57},
  {y: 47.37, x: 73},
  {y: 24.68, x: 48},
  {y: 45.83, x: 34},
  {y: 26.66, x: 18},
  {y: 41.89, x: 42}
];

const yDomain = myDATA.reduce(
  (res, row) => {
    return {
      max: Math.max(res.max, row.y),
      min: Math.min(0)
    };
  },
  {max: -Infinity, min: Infinity}
);

export default class Example extends React.Component {
  state = {
    useCanvas: false
  };

  render() {
    const {useCanvas} = this.state;
    const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    return (
      <div style={{paddingTop: 20}}>
        <XYPlot
          margin={{left: 100}}
          xType="ordinal"
          width={800}
          height={500}
          yDomain={[yDomain.min, yDomain.max]}
        >
          <BarSeries className="vertical-bar-series-example" data={myDATA} />
          <YAxis title = "Quantity"/>
          <XAxis title = "Bid Prices"/>
        </XYPlot>
      </div>
    );
  }
}