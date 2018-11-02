import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryChart,
VictoryBar,
VictoryZoomContainer,
VictoryLine,
VictoryBrushContainer,
VictoryAxis,
Bar } from 'victory';
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

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      style: {
        data: { fill: "tomato" }
      }
    };
  }

  render() {
    const handleMouseOver = () => {
      const fillColor = this.state.clicked ? "blue" : "tomato";
      const clicked = !this.state.clicked;
      this.setState({
        clicked,
        style: {
          data: { fill: fillColor }
        }
      });
    };

    return (
      <div>
        <VictoryChart height={400} width={400}
          domainPadding={{ x: 50, y: [0, 20] }}
          scale={{ x: "time" }}
        >
          <VictoryBar
            dataComponent={
              <Bar events={{ onMouseOver: handleMouseOver }}/>
            }
            style={this.state.style}
            data={[
              { x: new Date(1986, 1, 1), y: 2 },
              { x: new Date(1996, 1, 1), y: 3 },
              { x: new Date(2006, 1, 1), y: 5 },
              { x: new Date(2016, 1, 1), y: 4 }
            ]}
          />
        </VictoryChart>
      </div>
    );
  }
 }