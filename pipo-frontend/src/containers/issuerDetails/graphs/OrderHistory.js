import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryChart,
VictoryBar,
VictoryZoomContainer,
VictoryLine,
VictoryBrushContainer,
VictoryAxis,
VictoryLabel } from 'victory';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			zoomDomain: { x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] }
		};
	}

	handleZoom(domain) {
		this.setState({ zoomDomain: domain });
	}

	render() {
		return (
			<div>
				<VictoryChart width={600} height={470} scale={{ x: "time" }}
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
							data={[
								{ a: new Date(1982, 1, 1), b: 125 },
								{ a: new Date(1987, 1, 1), b: 257 },
								{ a: new Date(1993, 1, 1), b: 345 },
								{ a: new Date(1997, 1, 1), b: 515 },
								{ a: new Date(2001, 1, 1), b: 132 },
								{ a: new Date(2005, 1, 1), b: 305 },
								{ a: new Date(2011, 1, 1), b: 270 },
								{ a: new Date(2015, 1, 1), b: 470 }
							]}
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
						label="Queries"
						style={{
							axisLabel: { padding: 35 }
						}}
					/>
					</VictoryChart>
					<VictoryChart
						padding={{ top: 10, left: 50, right: 50, bottom: 50 }}
						width={700} height={200} scale={{ x: "time" }}
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
							tickFormat={(x) => new Date(x).getFullYear()}
						/>
						<VictoryLine
							style={{
								data: { stroke: "tomato" }
							}}
							data={[
								{ key: new Date(1982, 1, 1), b: 125 },
								{ key: new Date(1987, 1, 1), b: 257 },
								{ key: new Date(1993, 1, 1), b: 345 },
								{ key: new Date(1997, 1, 1), b: 515 },
								{ key: new Date(2001, 1, 1), b: 132 },
								{ key: new Date(2005, 1, 1), b: 305 },
								{ key: new Date(2011, 1, 1), b: 270 },
								{ key: new Date(2015, 1, 1), b: 470 }
							]}
							x="key"
							y="b"
						/>
					</VictoryChart>
			</div>
		);
	}
}