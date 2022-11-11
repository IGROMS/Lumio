import React from 'react';
import Chart from 'react-apexcharts';
import './BoughtChart.scss'

const BoughtChart = (props) => {

  const series = [{
    type: "bar",
    name: props.seriesName,
    data: props.data[0]
  }
]


  const options = {
    chart: { id: props.chartType,
      toolbar: {
        show: false
      }
    },
    grid: {
      show: true,
      xaxis: {
          lines: {
              show: false
          }
      },   
      yaxis: {
          lines: {
              show: false
          }
      }
    },
    legend: {
      show: true,
      onItemClick: {
        toggleDataSeries: false
      },
      onItemHover: {
          highlightDataSeries: false
      },
    },
    xaxis: {
      categories: props.xName,
      labels: {
        show: true,
      },
      tooltip: {
        enabled: false,
      }

    },
    yaxis: {
      labels: {
        show: false,
      },
      
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