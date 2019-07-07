/* eslint-disable react/prop-types */
import React from 'react';
import Chart from 'react-apexcharts';

function ScatterChart(props) {
  const {data = []} = props;
  /* console.log(
    data.map(el => {
      return {
        name: `Riesgo ${el.riskNum}`,
        data: [[el.impact, el.prob]],
      };
    }),
  ); */

  const lowData = data.filter(el => el.cualitRiskLevel === 'Baja');
  const modData = data.filter(el => el.cualitRiskLevel === 'Moderada');
  const highData = data.filter(el => el.cualitRiskLevel === 'Alta');
  const extData = data.filter(el => el.cualitRiskLevel === 'Extrema');

  console.log('lowData', lowData, lowData.map(el => [el.impact, el.prob]));
  console.log('modData', modData);
  console.log('highData', highData, highData.map(el => [el.impact, el.prob]));
  console.log('extData', extData);

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
      colors: ['#6da06f', '#ffbb43', '#ff8652', '#c13525'],
    },
    series: [
      {
        name: 'Baja',
        data: lowData.map(el => [el.impact, el.prob]),
      },
      {
        name: 'Moderada',
        data: modData.map(el => [el.impact, el.prob]),
      },
      {
        name: 'Alta',
        data: highData.map(el => [el.impact, el.prob]),
      },
      {
        name: 'Extrema',
        data: extData.map(el => [el.impact, el.prob]),
      },
    ],
  };

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
