import { Box, useTheme } from '@mui/material';
import { Header } from '../../components/Header.jsx';
import { VehicleModelsChart } from '../../components/VehicleModelsChart.jsx';

const VehiclesHour = () => {
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="VEHÍCULOS POR HORA"
        subtitle="Gráfico del promedio de vehículos por hora según el modelo."
      />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        <VehicleModelsChart />
      </Box>
    </Box>
  );
};

export default VehiclesHour;
