import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryChart,
VictoryBar,
VictoryZoomContainer,
VictoryLine,
VictoryBrushContainer,
VictoryAxis,
Bar } from 'victory';
import data from './data.js';

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
          scale={{ x: "ordinal" }}
        >
          <VictoryBar
            dataComponent={
              <Bar events={{ onMouseOver: handleMouseOver }}/>
            }
            style={this.state.style}
            data={data.map(item => ({x: item.p, y: item.q}))}
          />
           <VictoryAxis
              label="Bidding Price"
              style={{
                axisLabel: { padding: 35 }
              }}
            />
          
          <VictoryAxis dependentAxis
            label="Quantity"
            style={{
              axisLabel: { padding: 35 }
            }}
          />
        </VictoryChart>
      </div>
    );
  }
 }