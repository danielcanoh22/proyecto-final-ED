import Register from '../models/Register.js';
import Vehicle from '../models/Vehicle.js';
import Junction from '../models/Junction.js';

// ----------------------------------------------------------------
export const getRegisters = async (req, res) => {
  try {
    const registers = await Register.find();
    res.status(200).json(registers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCombinedData = async (req, res) => {
  try {
    // Obtén los datos combinados
    // const combinedData = await Vehicle.find();
    const combinedData = await Register.find();

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getJunctions = async (req, res) => {
  try {
    const junctions = await Junction.find().sort({ date_time: 1 }).lean();

    // Convertir la cadena date_time a objetos de fecha para ordenar correctamente
    junctions.forEach(junction => {
      junction.date_time = new Date(junction.date_time);
    });

    // Ordenar los objetos de intersección por fecha ascendente
    junctions.sort((a, b) => a.date_time - b.date_time);

    res.status(200).json(junctions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
