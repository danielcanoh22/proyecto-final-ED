import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema(
  {
    license_plate: String,
    car_model: String,
    car_color: String,
    car_brand: String,
    id_register: String,
  },
  { timestamps: true }
);

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

export default Vehicle;
