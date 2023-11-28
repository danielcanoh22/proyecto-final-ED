import { DataGrid } from '@mui/x-data-grid';
import {  useGetVehiclesQuery } from '../../state/api.js';
import { Header } from '../../components/Header.jsx';
import { Box, useTheme } from '@mui/material';

const Vehicles = () => {
  const theme = useTheme();


  const { data, isLoading } = useGetVehiclesQuery();

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'id_register',
      headerName: 'ID Register',
      flex: 1,
    },
    {
      field: 'license_plate',
      headerName: 'License Plate',
      flex: 1,
    },
    {
      field: 'car_model',
      headerName: 'Car Model',
      flex: 1,
    },
    {
      field: 'car_color',
      headerName: 'Car Color',
      flex: 1,
    },
    {
      field: 'car_brand',
      headerName: 'Car Brand',
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="VEHÍCULOS" subtitle="Lista completa de vehículos." />
      <Box
        height="80vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
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
            backgroundColor: theme.palette.primary.light,
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
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Vehicles;
