import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { themeSettings } from './theme';

import Layout from './scenes/layout';
import Dashboard from './scenes/dashboard';
import JunctionMonths from './scenes/junctionmonths';
import Traffic from './scenes/traffic';
import Vehicles from './scenes/vehicles';
import VehiclesHour from './scenes/vehicleshour';
import VehiclesJunction from './scenes/vehiclesjunction';
import Breakdown from './scenes/vehiclemodels';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/traffic" element={<Traffic />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/models" element={<Breakdown />} />
              <Route path="/junctions" element={<VehiclesJunction />} />
              <Route path="/vehicleshour" element={<VehiclesHour />} />
              <Route path="/junctionsmonths" element={<JunctionMonths />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
