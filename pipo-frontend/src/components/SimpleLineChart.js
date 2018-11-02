import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Legend from "recharts/lib/component/Legend";
import Line from "recharts/lib/cartesian/Line";
import LineChart from "recharts/lib/chart/LineChart";
import PropTypes from "prop-types";
import React from "react";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import Tooltip from "recharts/lib/component/Tooltip";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";

class SimpleLineChart extends React.Component {
  render () {
    const {data} = this.props;
    return (
    // 99% per https://github.com/recharts/recharts/issues/172
      <ResponsiveContainer
        width="99%"
        height={320}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Visits"
            stroke="#82ca9d" />
          <Line
            type="monotone"
            dataKey="Orders"
            stroke="#8884d8"
            activeDot={{r: 8}} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

SimpleLineChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default SimpleLineChart;