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
  moodToNumber2?: string[];
  messages2?: string[];
  age2?: number[];
}

const Chart: React.FC<Props> = ({
  moodToNumber,
  messages,
  age,
  moodToNumber2,
  messages2,
  age2,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ChartJS.register(
      LineController,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Tooltip
    );

    const destroyChart = () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };

    const createChart = () => {
      const datasets = [
        {
          label: '그래프 1',
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
      ];

      // 두 번째 그래프가 존재할 경우 추가
      if (moodToNumber2 && messages2 && age2) {
        datasets.push({
          label: '그래프 2',
          data: moodToNumber2.map((value) => parseInt(value, 10)),
          borderColor: '#5B8DEF',
          backgroundColor: '#5B8DEF',
          pointRadius: 6,
          pointBorderWidth: 2,
          pointBorderColor: '#FFFFFF',
          pointHoverRadius: 8,
          pointHoverBorderColor: '#FFFFFF',
          fill: false,
        });
      }

      const labels = age.map((value) => value.toString());

      chartInstance.current = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels,
          datasets,
        },
        options: {
          maintainAspectRatio: false,
          resizeDelay: 1,
          scales: {
            x: {
              display: true,
              grid: {
                display: true,
                color: (context) => context.tick.value > 0 ? '#474747' : '#FFFFFF',
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
                title: (tooltipItems) => {
                  return '기억에 남는 일';
                },
                label: (tooltipItem) => {
                  const datasetIndex = tooltipItem.datasetIndex;
                  const dataIndex = tooltipItem.dataIndex;

                  if (datasetIndex === 0) {
                    return messages[dataIndex] ?? '';
                  } else if (datasetIndex === 1 && messages2) {
                    return messages2[dataIndex] ?? '';
                  }
                  return '';
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

    destroyChart();
    createChart();

    return () => {
      destroyChart();
    };
  }, [moodToNumber, messages, age, moodToNumber2, messages2, age2]);

  return (
    <div className={cn('p-[2.25rem]', 'gap-[1.5rem]', 'w-full', 'h-full', 'rounded-xl')}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default Chart;