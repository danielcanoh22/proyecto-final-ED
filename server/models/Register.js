import mongoose from 'mongoose';

const RegisterSchema = new mongoose.Schema(
  {
    date_time: String,
    id_junction: String,
    vehicles_count: Number,
    id_register: String,
  },
  { timestamps: true }
);

const Register = mongoose.model('Register', RegisterSchema);

export default Register;
