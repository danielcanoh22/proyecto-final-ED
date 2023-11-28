import FlexBetween from '../../components/FlexBetween';
import { Header } from '../../components/Header';
import {
  Email,
} from '@mui/icons-material';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useGetDashboardQuery } from '../../state/api.js';
import { StatBox } from '../../components/StatBox';
import { VehiclesChart } from '../../components/VehiclesChart';
import { VehicleModelsChart } from '../../components/VehicleModelsChart';
import { JunctionChart } from '../../components/JunctionChart';

const months = {
  '01': 'Enero',
  '02': 'Febrero',
  '03': 'Marzo',
  '04': 'Abril',
  '05': 'Mayo',
  '06': 'Junio',
  '07': 'Julio',
  '08': 'Agosto',
  '09': 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre',
};

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)');
  const { data, isLoading } = useGetDashboardQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          '& > div': { gridColumn: isNonMediumScreens ? undefined : 'span 12' },
        }}
      >
        <StatBox
          title={`Intersección más congestionada: ${
            !data ? 0 : data.max_intersection
          }`}
          value={!data ? 0 : data.max_vehicles}
          increase="vehículos"
          description="Desde el 2015"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />
        <StatBox
          title={`Intersección menos congestionada: ${
            !data ? 0 : data.min_intersection
          }`}
          value={!data ? 0 : data.min_vehicles}
          increase="vehículos"
          description="Desde el 2015"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          {/* <OverviewChart view="sales" isDashboard={true} /> */}
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Promedio de vehículos por modelo en ciertas horas.
          </Typography>
          <VehicleModelsChart />
        </Box>
        <StatBox
          title={`Horas más congestionadas`}
          value={
            !data
              ? 0
              : `${
                  !data
                    ? 0
                    : `${data.top_hours[0].hour}:00 y ${data.top_hours[1].hour}`
                }:00`
          }
          increase={!data ? 0 : `${data.total_vehicles_hours} vehículos`}
          description="en promedio"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />
        <StatBox
          title={`Meses con más vehículos`}
          value={
            !data
              ? 0
              : `${months[data.top_months[0].month]} y ${
                  months[data.top_months[1].month]
                }`
          }
          increase={!data ? 0 : `${data.total_vehicles_months} vehículos`}
          description="en total"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />

        <Box
          gridColumn="span 7"
          gridRow="span 3"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
              borderRadius: '5rem',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.background.alt,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          {/* <DataGrid
            loading={isLoading || !data.registers}
            getRowId={(row) => row._id}
            rows={(data && data.registers) || []}
            columns={columns}
          /> */}
          {/* <VehicleJunctionChart isDashboard={true} /> */}
          <JunctionChart isDashboard />
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Cantidad de vehículos por modelo
          </Typography>
          {/* <BreakdownChart isDashboard={true} /> */}
          {/* <VehicleModelsHourChart isDashboard={true} /> */}
          <VehiclesChart isDashboard={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
