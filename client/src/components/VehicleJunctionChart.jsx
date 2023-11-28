import { useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetTrafficQuery } from '../state/api.js';
import 'react-datepicker/dist/react-datepicker.css';
import { ResponsiveBar } from '@nivo/bar';

const months = {
  month1: 'Enero',
  month2: 'Febrero',
  month3: 'Marzo',
  month4: 'Abril',
  month5: 'Mayo',
  month6: 'Junio',
  month7: 'Julio',
  month8: 'Agosto',
  month9: 'Septiembre',
  month10: 'Octubre',
  month11: 'Noviembre',
  month12: 'Diciembre',
};

function getVehiclesPerJunction(data) {
  const results = {};

  data.forEach((item) => {
    const idJunction = `interseccion${item.id_junction}`;
    const date = new Date(item.date_time);
    const month = date.getMonth() + 1;

    if (!results[idJunction]) {
      results[idJunction] = {};
    }

    const monthKey = months[`month${month}`];
    if (!results[idJunction][monthKey]) {
      results[idJunction][monthKey] = 0;
    }

    results[idJunction][monthKey] += item.vehicles_count;
  });

  // Convertir los resultados al formato solicitado
  const formattedResults = Object.entries(results).map(([junction, month]) => {
    const junctionNum = parseInt(junction.replace('interseccion', ''), 10);
    const formattedResult = { interseccion: junctionNum };

    Object.entries(month).forEach(([month, vehicles_count], index) => {
      const monthKey = month;
      formattedResult[monthKey] = vehicles_count;
    });

    return formattedResult;
  });

  return formattedResults;
}

export const VehicleJunctionChart = ({isDashboard = false}) => {
  const { data } = useGetTrafficQuery();
  const theme = useTheme();

  const formattedData = useMemo(() => {
    if (!data) return [];

    return getVehiclesPerJunction(data);
  }, [data]);

  return (
    <Box height={isDashboard ? '60vh' : '75vh'}>
        {formattedData ? (
          <ResponsiveBar
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
            keys={[
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre',
            ]}
            indexBy="interseccion"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'pastel2' }}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 2,
                stagger: true,
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#FCDFB3',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: 'Enero',
                },
                id: 'dots',
              },
              // {
              //   match: {
              //     id: 'Febrero',
              //   },
              //   id: 'lines',
              // },
              {
                match: {
                  id: 'Marzo',
                },
                id: 'lines',
              },
              // {
              //   match: {
              //     id: 'Abril',
              //   },
              //   id: 'lines',
              // },
              {
                match: {
                  id: 'Mayo',
                },
                id: 'dots',
              },
              // {
              //   match: {
              //     id: 'Junio',
              //   },
              //   id: 'lines',
              // },
              {
                match: {
                  id: 'Julio',
                },
                id: 'lines',
              },
              // {
              //   match: {
              //     id: 'Agosto',
              //   },
              //   id: 'lines',
              // },
              {
                match: {
                  id: 'Septiembre',
                },
                id: 'dots',
              },
              // {
              //   match: {
              //     id: 'Octubre',
              //   },
              //   id: 'lines',
              // },
              {
                match: {
                  id: 'Noviembre',
                },
                id: 'lines',
              },
              // {
              //   match: {
              //     id: 'Diciembre',
              //   },
              //   id: 'lines',
              // },
            ]}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Intersección',
              legendPosition: 'middle',
              legendOffset: 32,
              truncateTickAt: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Vehículos',
              legendPosition: 'middle',
              legendOffset: -40,
              truncateTickAt: 0,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 1.6]],
            }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={(e) =>
              e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
            }
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
  );
};
