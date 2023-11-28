import { Box, Select, MenuItem, useTheme, useMediaQuery } from '@mui/material';
import { useGetJuntionsMonthsQuery } from '../state/api.js';
import { useMemo, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';

const daticos = [
  {
    id: '1',
    color: 'hsl(80, 70%, 50%)',
    data: [
      {
        x: 'nov_2015',
        y: 14736,
      },
      {
        x: 'dic_2015',
        y: 15487,
      },
      {
        x: 'ene_2016',
        y: 17940,
      },
      {
        x: 'feb_2016',
        y: 20813,
      },
      {
        x: 'mar_2016',
        y: 22215,
      },
      {
        x: 'abr_2016',
        y: 22241,
      },
      {
        x: 'may_2016',
        y: 25900,
      },
      {
        x: 'jun_2016',
        y: 26461,
      },
      {
        x: 'jul_2016',
        y: 29111,
      },
      {
        x: 'ago_2016',
        y: 31185,
      },
      {
        x: 'sept_2016',
        y: 34374,
      },
      {
        x: 'oct_2016',
        y: 37224,
      },
      {
        x: 'nov_2016',
        y: 38222,
      },
      {
        x: 'dic_2016',
        y: 39412,
      },
      {
        x: 'ene_2017',
        y: 43439,
      },
      {
        x: 'feb_2017',
        y: 42116,
      },
      {
        x: 'mar_2017',
        y: 47111,
      },
      {
        x: 'abr_2017',
        y: 45245,
      },
      {
        x: 'may_2017',
        y: 51327,
      },
      {
        x: 'jun_2017',
        y: 52853,
      },
    ],
  },
];

function transformDataForId(records, targetId) {
  const transformedData = [];

  records.forEach((record) => {
    const date = new Date(record.date_time);
    const month = date.toLocaleString('default', { month: 'short' });

    if (!transformedData[targetId]) {
      transformedData[targetId] = {
        id: targetId.toString(),
        color: `hsl(${targetId * 80}, 70%, 50%)`,
        data: [],
      };
    }

    transformedData[targetId].data.push({
      x: `${month}_${date.getFullYear()}`,
      y: record[targetId],
    });
  });

  return transformedData.filter(Boolean); // Eliminar elementos nulos si algún targetId no tiene registros
}

export const JunctionChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetJuntionsMonthsQuery();
  // const isNonMobile = useMediaQuery('(min-width: 1000px)');
  const theme = useTheme();
  const [junction, setJunction] = useState(1);
  const formattedData = useMemo(() => {
    if (!data) return [];

    return transformDataForId(data, junction);
  }, [data, junction]);

  if (!data || isLoading) return 'Loading...';

  const handleJunctionChange = (event) => {
    setJunction(event.target.value);
  };

  return (
    <>
      <Box p="1rem">
        <Select
          // label="Intersección"
          value={junction}
          onChange={handleJunctionChange}
        >
          <MenuItem value={1}>Intersección 1</MenuItem>
          <MenuItem value={2}>Intersección 2</MenuItem>
          <MenuItem value={3}>Intersección 3</MenuItem>
          <MenuItem value={4}>Intersección 4</MenuItem>
        </Select>
      </Box>
      <Box
        height={isDashboard ? '400px' : '100%'}
        width={undefined}
        minHeight={isDashboard ? '325px' : undefined}
        minWidth={isDashboard ? '325px' : undefined}
        position="relative"
      >
        <ResponsiveLine
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
          curve="natural"
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
    </>
  );
};
