import React from 'react';
import Chart from 'react-apexcharts';
import './BoughtChart.scss'

const BoughtChart = (props) => {

  const series = [props.data[0], props.data[1]]

  const options = {
    chart: { id: props.chartType,
      type: "donut",
    },
    labels: ["Peer to peer", "Power used"],
    plotOptions: {
      pie: {
        donut: {
          size: '65%'
        }
      }
    },
    legend: {
      show: false
    }
  }

  return (
    <div className='dashboard-chart'>
      <Chart 
        options={options}
        series={series}
        type={props.chartType}
        width={props.width}
        height={props.height}
      />
    </div>
  );
};

export default BoughtChart;