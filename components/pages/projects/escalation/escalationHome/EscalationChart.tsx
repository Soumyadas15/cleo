"use client"


import React from 'react';
import Chart, {Props} from 'react-apexcharts';

const state: Props['series'] = [
   {
      name: 'Series1',
      data: [31, 40, 28, 51, 42, 109, 100],
   },
   {
      name: 'Series2',
      data: [11, 32, 45, 32, 34, 52, 41],
   },
];

const options: Props['options'] = {
   chart: {
      type: 'area',
      animations: {
         easing: 'linear',
         speed: 300,
      },
      
      sparkline: {
         enabled: false,
      },
      brush: {
         enabled: false,
      },
      id: 'basic-bar',
      fontFamily: 'Inter, sans-serif',
      foreColor: 'white',
      stacked: true,
      toolbar: {
         show: false,
      },
   },

   xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      labels: {
         // show: false,
         style: {
            colors: 'white',
            fontFamily: 'Inter, sans-serif',
         },
      },
      axisBorder: {
         color: 'white',
      },
      axisTicks: {
         color: 'white',
      },
   },
   yaxis: {
      labels: {
         style: {
            colors: 'white',
            fontFamily: 'Inter, sans-serif',
         },
      },
   },
   tooltip: {
      enabled: false,
   },
   grid: {
      show: true,
      borderColor: 'var(--nextui-colors-border)',
      strokeDashArray: 0,
      position: 'back',
   },
   stroke: {
      curve: 'smooth',
      fill: {
         colors: ['white'],
      },
   },
   // @ts-ignore
   markers: false,
};

export const EscalationChart = () => {
   return (
      <>
         <div className='w-full h-full z-[9999] flex items-center justify-center pt-8'>
            <div id="chart" className='w-full h-full'>
               <Chart
                  options={options}
                  series={state}
                  type="area"
                  height={425}
                  stroke = {2}
               />
            </div>
         </div>
      </>
   );
};