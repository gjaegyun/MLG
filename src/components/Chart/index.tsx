'use client'

import { cn } from '@/lib/utils';
import {
  CategoryScale,
  Chart as ChartJS,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';


import { useEffect, useRef } from 'react';

interface Props {
  moodToNumber: string[];
  messages: string[];
  age: number[];
}

const Chart: React.FC<Props> = ({
  moodToNumber,
  messages,
  age,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const createChart = () => {
      ChartJS.register(
        LineController,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Tooltip
      );
      chartInstance.current = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: age.map((value) => value.toString()),
          datasets: [
            {
              label: 'Subscriber Number',
              data: moodToNumber.map((value) => parseInt(value, 10)),
              borderColor: '#FF952B',
              backgroundColor: '#FF952B',
              pointRadius: 6,
              pointBorderWidth: 2,
              pointBorderColor: '#FFFFFF',
              pointHoverRadius: 8,
              pointHoverBorderColor: '#FFFFFF',
              fill: false,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          resizeDelay: 1,
          scales: {
            x: {
              display: true,
              grid: {
                display: true,
                color: function (context) {
                  if (context.tick.value > 0) {
                    return '#474747';
                  }
                  return '#FFFFFF';
                },
                lineWidth: 1,
              },
            },
            y: {
              beginAtZero: true,
              min: -5,
              max: 5,
              grid: {
                display: true,
                color: '#474747',
                lineWidth: 1,
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: () => {
                  return `기억에 남는 일`;
                },
                label: (tooltipItem) => {
                  const index = tooltipItem.dataIndex;
                  return `${messages[index]}`;
                },
              },
              backgroundColor: '#474747',
              displayColors: false,
              padding: 12,
              titleColor: '#BABABA',
              titleMarginBottom: 4,
              titleAlign: 'center',
              titleFont: {
                size: 16,
                weight: 400,
                style: 'normal',
              },
              bodyFont: {
                size: 24,
                weight: 600,
                style: 'normal',
              },
            },
          },
        },
      });
    };

    const destroyChart = () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };

    destroyChart();
    createChart();

    return () => {
      destroyChart();
    };
  }, [moodToNumber, messages, age]);

  return (
    <div className={cn('p-[2.25rem]', 'gap-[1.5rem]', 'w-full', 'h-full', 'rounded-xl')}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default Chart;
