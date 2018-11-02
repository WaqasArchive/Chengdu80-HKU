import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryChart,
VictoryBar,
VictoryZoomContainer,
VictoryLine,
VictoryBrushContainer,
VictoryAxis,
VictoryLabel } from 'victory';
import data from './data.js';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			zoomDomain: { x: [1,2000] }
		};
	}

	handleZoom(domain) {
		this.setState({ zoomDomain: domain });
	}

	render() {
		return (
			<div>
				<VictoryChart width={600} height={470} scale={{ x: "ordinal" }}
					containerComponent={
						<VictoryZoomContainer
							zoomDimension="x"
							zoomDomain={this.state.zoomDomain}
							onZoomDomainChange={this.handleZoom.bind(this)}
						/>
					}
				>
						<VictoryLine
							style={{
								data: { stroke: "tomato" }
							}}
							data=
								{data.map(item => ({b: item.p, b: item.q}))}
							
							x="a"
							y="b"
						/>
					<VictoryAxis
						label="Price"
						style={{
							axisLabel: { padding: 30 }
						}}
					/>
					<VictoryAxis dependentAxis
						label="Quantities"
						style={{
							axisLabel: { padding: 35 }
						}}
					/>
					</VictoryChart>
					<VictoryChart
						padding={{ top: 10, left: 50, right: 50, bottom: 50 }}
						width={600} height={100} scale={{ x: "ordinal" }}
						containerComponent={
							<VictoryBrushContainer
								brushDimension="x"
								brushDomain={this.state.zoomDomain}
								onBrushDomainChange={this.handleZoom.bind(this)}
							/>
						}
					>
						<VictoryAxis
							label="Price"
							//tickFormat={(x) => new Date(x).getFullYear()}
						/>
						<VictoryLine
							style={{
								data: { stroke: "blue" }
							}}
							data={[
								{ key: 0, b: 125 },
								{ key: 10, b: 257 },
								{ key: 20, b: 345 },
								{ key: 30, b: 515 },
								{ key: 40, b: 132 },
								{ key: 50, b: 305 },
								{ key: 60, b: 270 },
								{ key: 90, b: 470 },
								{ key: 100, b: 470 },
							]}
							x="key"
							y="b"
						/>
					</VictoryChart>
			</div>
		);
	}
}