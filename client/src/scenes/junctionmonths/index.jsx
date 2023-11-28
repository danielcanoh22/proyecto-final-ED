import { Box } from '@mui/material';
import { Header } from '../../components/Header';
import { JunctionChart } from '../../components/JunctionChart';

const JunctionMonths = () => {

  return (
    <>
      <Box p="1rem">
        <Header
          title="INTERSECCIONES"
          subtitle="Gráfico de la cantidad de vehículos por mes en cada intersección."
        />
      </Box>
      <JunctionChart />
    </>
  );
};

export default JunctionMonths;
