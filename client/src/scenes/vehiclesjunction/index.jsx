import { Box } from '@mui/material';
import { Header } from '../../components/Header';
import 'react-datepicker/dist/react-datepicker.css';
import { VehicleJunctionChart } from '../../components/VehicleJunctionChart';

const VehiclesJunction = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="INTERSECCIONES"
        subtitle="Gráfico de la cantidad de vehículos por mes en cada intersección."
      />
      <VehicleJunctionChart />
    </Box>
  );
};

export default VehiclesJunction;
