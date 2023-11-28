import { Box, useTheme } from '@mui/material';
import { useGetTrafficQuery } from '../../state/api.js';
import { Header } from '../../components/Header.jsx';
import { DataGrid } from '@mui/x-data-grid';

const Traffic = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetTrafficQuery();

  const columns = [
    {
      field: 'id_register',
      headerName: 'ID Register',
      flex: 1,
    },
    {
      field: 'date_time',
      headerName: 'Date Time',
      flex: 1,
    },
    {
      field: 'id_junction',
      headerName: 'ID Junction',
      flex: 1,
    },
    {
      field: 'vehicles_count',
      headerName: 'Vehicles Count',
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRÁFICO" subtitle="Lista de registros de cada intersección." />
      <Box
        mt="40px"
        height="75vh"
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

export default Traffic;
