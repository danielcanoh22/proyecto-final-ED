import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';

// data imports
// import Register from './models/Register.js';
// import Vehicle from './models/Vehicle.js';
// import Junction from './models/Junction.js';
// import JunctionDay from './models/JunctionDay.js';

// import { dataTraffic, dataVehicles, dataJunctions, dataJunctionsDays } from './data/index.js';

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);

// MONGOOSE
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // Only add data one time
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // User.insertMany(dataUser);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AfilliateStat.insertMany(dataAffiliateStat);
    // Register.insertMany(dataTraffic);
    // Vehicle.insertMany(dataVehicles);
    // Junction.insertMany(dataJunctions);
    // JunctionDay.insertMany(dataJunctionsDays);
  })
  .catch((error) => console.log(`${error} did not connect`));
