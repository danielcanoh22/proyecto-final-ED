import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL,
  }),
  reducerPath: 'adminApi',
  tagTypes: [
    'JuntionsMonths',
    'Traffic',
    'Vehicles',
    'VehiclesHour',
    'Dashboard',
  ],
  endpoints: (build) => ({
    getJuntionsMonths: build.query({
      query: () => 'client/juntionsmonths',
      providesTags: ['JuntionsMonths'],
    }),
    getVehiclesHour: build.query({
      query: () => 'client/vehicleshour',
      providesTags: ['VehiclesHour'],
    }),
    getDashboard: build.query({
      query: () => 'general/dashboard',
      providesTags: ['Dashboard'],
    }),
    getTraffic: build.query({
      query: () => 'client/traffic',
      providesTags: ['Traffic'],
    }),
    getVehicles: build.query({
      query: () => 'client/vehicles',
      providesTags: ['Vehicles'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetJuntionsMonthsQuery,
  useGetTrafficQuery,
  useGetVehiclesQuery,
  useGetVehiclesHourQuery,
  useGetDashboardQuery,
} = api;
