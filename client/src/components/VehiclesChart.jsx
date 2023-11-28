import { ResponsivePie } from '@nivo/pie';
import { Box, useTheme } from '@mui/material';
import { useGetVehiclesQuery } from '../state/api.js';
import { useEffect, useState } from 'react';

function countVehicles(data) {
  const totalVehicles = {};

  data.forEach((vehicle) => {
    const model = vehicle.car_model;

    if (model && typeof model === 'string') {
      totalVehicles[model] = (totalVehicles[model] || 0) + 1;
    }
  });

  return totalVehicles;
}

export const VehiclesChart = ({ isDashboard = false }) => {

  const { data, isLoading } = useGetVehiclesQuery();
  const theme = useTheme();

  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (data) {
      const vehiculosPorModelo = countVehicles(data);
      const colors = [
        theme.palette.secondary[500],
        theme.palette.secondary[800],
        theme.palette.secondary[400],
        theme.palette.secondary[600],
        theme.palette.secondary[700],
        theme.palette.secondary[500],
        theme.palette.secondary[300],
      ];

      const formatted = Object.entries(vehiculosPorModelo).map(
        ([modelo, cantidad], i) => ({
          id: modelo,
          label: modelo,
          value: cantidad,
          color: colors[i],
        })
      );
      setFormattedData(formatted);
    }
  }, [data]);

  if (!data || isLoading) return 'Loading...';

  return (
    <Box
      height={isDashboard ? '400px' : '100%'}
      width={undefined}
      minHeight={isDashboard ? '325px' : undefined}
      minWidth={isDashboard ? '325px' : undefined}
      position="relative"
    >
      <ResponsivePie
        data={formattedData}
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
        colors={{ datum: 'data.color' }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        enableArcLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};
