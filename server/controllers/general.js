import Register from '../models/Register.js';

export const getRegistersWithMaxVehicles = async (req, res) => {
  try {
    const registers = await Register.find();

    // Calcular la intersección con más vehículos
    const junctions = {};
    const hoursByJunction = {};

    for (const register of registers) {
      const { id_junction, vehicles_count, date_time } = register;

      if (!junctions[id_junction]) {
        junctions[id_junction] = 0;
        hoursByJunction[id_junction] = [];
      }

      junctions[id_junction] += vehicles_count;
      hoursByJunction[id_junction].push({ date_time, vehicles_count });
    }

    // Encontrar la intersección con más vehículos
    let maxJunction = null;
    let maxVehicles = 0;

    for (const junctionId in junctions) {
      const totalVehicles = junctions[junctionId];

      if (totalVehicles > maxVehicles) {
        maxVehicles = totalVehicles;
        maxJunction = junctionId;
      }
    }

    let minJunction = null;
    let minVehicles = maxVehicles;

    for (const junctionId in junctions) {
      const totalVehicles = junctions[junctionId];

      if (totalVehicles < minVehicles) {
        minVehicles = totalVehicles;
        minJunction = junctionId;
      }
    }

    // Calcular la cantidad total de vehículos por hora
    const hours = {};
    for (const register of registers) {
      const { date_time, vehicles_count } = register;
      const hourKey = date_time.substring(0, 13); // Agrupa por hora (yyyy-mm-dd hh)

      if (!hours[hourKey]) {
        hours[hourKey] = 0;
      }

      hours[hourKey] += vehicles_count;
    }

    // Encontrar las 3 horas con más vehículos
    const topHours = Object.keys(hours)
      .map((hourKey) => ({
        hour: hourKey.split(' ')[1],
        vehicles_count: hours[hourKey],
      }))
      .sort((a, b) => b.vehicles_count - a.vehicles_count)
      .slice(0, 2);

    const totalVehicles = topHours.reduce((acc, hour) => {
      return acc + hour.vehicles_count;
    }, 0);

    // Calcular la cantidad total de vehículos por mes
    const months = {};
    for (const register of registers) {
      const { date_time, vehicles_count } = register;
      const monthKey = date_time.substring(0, 7).split('-')[1]; // Agrupa por mes (yyyy-mm)

      if (!months[monthKey]) {
        months[monthKey] = 0;
      }

      months[monthKey] += vehicles_count;
    }

    // Encontrar los 2 meses con más vehículos
    const topMonths = Object.keys(months)
      .map((monthKey) => ({
        month: monthKey,
        vehicles_count: months[monthKey],
      }))
      .sort((a, b) => b.vehicles_count - a.vehicles_count)
      .slice(0, 2);

    // Calcular la cantidad total de vehículos para los 2 meses
    const totalVehiclesMonths = topMonths.reduce((acc, month) => {
      return acc + month.vehicles_count;
    }, 0);

    // ------------------------------------------------

    // Devolver el objeto solicitado
    const result = {
      max_intersection: maxJunction,
      max_vehicles: maxVehicles,
      min_intersection: minJunction,
      min_vehicles: minVehicles,
      top_hours: topHours,
      total_vehicles_hours: totalVehicles,
      top_months: topMonths,
      total_vehicles_months: totalVehiclesMonths,
      registers: registers.slice(0, 25),
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
