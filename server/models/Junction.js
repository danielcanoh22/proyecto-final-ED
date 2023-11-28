import mongoose from 'mongoose';

const JunctionSchema = new mongoose.Schema(
  {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    date_time: String,
  },
  { timestamps: true }
);

const Junction = mongoose.model('Junction', JunctionSchema);

export default Junction;
