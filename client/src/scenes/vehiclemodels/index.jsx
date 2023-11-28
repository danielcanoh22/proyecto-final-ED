import { Box } from '@mui/material';
import { Header } from '../../components/Header';
import { VehiclesChart } from '../../components/VehiclesChart';

const Breakdown = () => {

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="MODELOS"
        subtitle="Gráfico de la cantidad de vehículos por cada modelo."
      />
      <Box mt="40px" height="75vh">
        <VehiclesChart />
      </Box>
    </Box>
  );
};

export default Breakdown;
