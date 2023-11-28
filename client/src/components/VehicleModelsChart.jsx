import { Box, useTheme } from '@mui/material';

import { ResponsiveLine } from '@nivo/line';
import { useGetVehiclesHourQuery } from '../state/api.js';

const data2 = [
  {
    id: 'Convertible',
    color: 'hsl(15, 70%, 50%)',
    data: [
      {
        x: "0'",
        y: 15,
      },
      {
        x: "3'",
        y: 8,
      },
      {
        x: "5'",
        y: 13.5,
      },
      {
        x: "8'",
        y: 15.5,
      },
      {
        x: "10'",
        y: 12,
      },
      {
        x: "13'",
        y: 11.5,
      },
      {
        x: "15'",
        y: 9,
      },
      {
        x: "18'",
        y: 13,
      },
      {
        x: "20'",
        y: 15,
      },
      {
        x: "24''",
        y: 7.5,
      },
    ],
  },
  {
    id: 'Furgoneta',
    color: 'hsl(15, 70%, 50%)',
    data: [
      {
        x: "0'",
        y: 13.7,
      },
      {
        x: "3'",
        y: 12.8,
      },
      {
        x: "5'",
        y: 12,
      },
      {
        x: "8'",
        y: 12.5,
      },
      {
        x: "10'",
        y: 11,
      },
      {
        x: "13'",
        y: 12.5,
      },
      {
        x: "15'",
        y: 13.5,
      },
      {
        x: "18'",
        y: 13,
      },
      {
        x: "20'",
        y: 10.5,
      },
      {
        x: "24''",
        y: 14.5,
      },
    ],
  },
  {
    id: 'Camioneta',
    color: 'hsl(15, 70%, 50%)',
    data: [
      {
        x: "0'",
        y: 12,
      },
      {
        x: "3'",
        y: 16,
      },
      {
        x: "5'",
        y: 13.5,
      },
      {
        x: "8'",
        y: 12.5,
      },
      {
        x: "10'",
        y: 13,
      },
      {
        x: "13'",
        y: 14,
      },
      {
        x: "15'",
        y: 11.5,
      },
      {
        x: "18'",
        y: 13,
      },
      {
        x: "20'",
        y: 13.8,
      },
      {
        x: "24''",
        y: 12.5,
      },
    ],
  },
  {
    id: 'Deportivo',
    color: 'hsl(15, 70%, 50%)',
    data: [
      {
        x: "0'",
        y: 8.5,
      },
      {
        x: "3'",
        y: 11,
      },
      {
        x: "5'",
        y: 12.8,
      },
      {
        x: "8'",
        y: 12,
      },
      {
        x: "10'",
        y: 14.8,
      },
      {
        x: "13'",
        y: 12.5,
      },
      {
        x: "15'",
        y: 13.7,
      },
      {
        x: "18'",
        y: 12.6,
      },
      {
        x: "20'",
        y: 12.2,
      },
      {
        x: "24''",
        y: 13,
      },
    ],
  },
  {
    id: 'Hatchback',
    color: 'hsl(15, 70%, 50%)',
    data: [
      {
        x: "0'",
        y: 8.5,
      },
      {
        x: "3'",
        y: 11,
      },
      {
        x: "5'",
        y: 12.8,
      },
      {
        x: "8'",
        y: 12,
      },
      {
        x: "10'",
        y: 14.8,
      },
      {
        x: "13'",
        y: 12.5,
      },
      {
        x: "15'",
        y: 13.7,
      },
      {
        x: "18'",
        y: 12.6,
      },
      {
        x: "20'",
        y: 12.2,
      },
      {
        x: "24''",
        y: 13,
      },
    ],
  },
  {
    id: 'SUV',
    color: 'hsl(15, 70%, 50%)',
    data: [
      {
        x: "0'",
        y: 8.5,
      },
      {
        x: "3'",
        y: 14,
      },
      {
        x: "5'",
        y: 6,
      },
      {
        x: "8'",
        y: 11,
      },
      {
        x: "10'",
        y: 10.5,
      },
      {
        x: "13'",
        y: 9.5,
      },
      {
        x: "15'",
        y: 11.7,
      },
      {
        x: "18'",
        y: 6,
      },
      {
        x: "20'",
        y: 10.2,
      },
      {
        x: "24''",
        y: 14.5,
      },
    ],
  },
  {
    id: 'Sedan',
    color: 'hsl(15, 70%, 50%)',
    data: [
      {
        x: "0'",
        y: 10.5,
      },
      {
        x: "3'",
        y: 11,
      },
      {
        x: "5'",
        y: 10.8,
      },
      {
        x: "8'",
        y: 8,
      },
      {
        x: "10'",
        y: 8.5,
      },
      {
        x: "13'",
        y: 13.5,
      },
      {
        x: "15'",
        y: 10.7,
      },
      {
        x: "18'",
        y: 6.5,
      },
      {
        x: "20'",
        y: 10.2,
      },
      {
        x: "24''",
        y: 10.5,
      },
    ],
  },
];

export const VehicleModelsChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetVehiclesHourQuery();

  if (!data || isLoading) return 'Loading...';

  return (
    <Box
      height={isDashboard ? '400px' : '100%'}
      width={undefined}
      minHeight={isDashboard ? '325px' : undefined}
      minWidth={isDashboard ? '325px' : undefined}
      position="relative"
    >
      <ResponsiveLine
        data={data2}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve='natural'
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Horas',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Promedio Vehículos',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};
