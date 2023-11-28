import mongoose from 'mongoose';

const JunctionDaySchema = new mongoose.Schema(
  {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    date_time: String,
  },
  { timestamps: true }
);

const JunctionDay = mongoose.model('JunctionDay', JunctionDaySchema);

export default JunctionDay;
