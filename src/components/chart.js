/* eslint-disable react/prop-types */
import React from 'react';
import Chart from 'react-apexcharts';

function ScatterChart(props) {
  const {data = []} = props;
  const chartConfig = {
    options: {
      chart: {
        zoom: {
          enabled: false,
          type: 'xy',
        },
      },
      xaxis: {
        tickAmount: 5,
        min: 0,
        max: 1,
        labels: {
          formatter: val => {
            return parseFloat(val).toFixed(1);
          },
        },
        range: 1,
      },
      yaxis: {
        tickAmount: 5,
        min: 0,
        max: 1,
        range: 1,
      },
    },
    series: [
      {
        name: 'SAMPLE A',
        data: data.map(el => [el.impact, el.prob]),
      },
    ],
  };
  console.log(chartConfig);
  return (
    <div id="chart">
      <Chart
        options={chartConfig.options}
        series={chartConfig.series}
        type="scatter"
        height="350"
      />
    </div>
  );
}

export default ScatterChart;
