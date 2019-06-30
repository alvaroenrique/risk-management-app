import React from 'react';
import Chart from 'react-apexcharts';

function generateData(count, yrange) {
  let i = 0;
  const series = [];
  while (i < count) {
    const x = (i + 1).toString();
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x,
      y,
    });
    // eslint-disable-next-line no-plusplus
    i++;
  }
  return series;
}

class HeatmapChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            colorScale: {
              ranges: [
                {
                  from: -30,
                  to: 5,
                  name: 'low',
                  color: '#00A100',
                },
                {
                  from: 6,
                  to: 20,
                  name: 'medium',
                  color: '#128FD9',
                },
                {
                  from: 21,
                  to: 45,
                  name: 'high',
                  color: '#FFB200',
                },
                {
                  from: 46,
                  to: 55,
                  name: 'extreme',
                  color: '#FF0000',
                },
              ],
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: 'HeatMap Chart with Color Range',
        },
      },
      series: [
        {
          name: 'Jan',
          data: generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: 'Feb',
          data: generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: 'Mar',
          data: generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: 'Apr',
          data: generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: 'May',
          data: generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: 'Jun',
          data: generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: 'Jul',
          data: generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: 'Aug',
          data: generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: 'Sep',
          data: generateData(20, {
            min: -30,
            max: 55,
          }),
        },
      ],
    };
  }

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="heatmap"
          height="350"
        />
      </div>
    );
  }
}

export default HeatmapChart;
