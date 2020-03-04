import 'dotenv/config';
import express from 'express';
import models, { sequelize } from './models';
import User from './controllers/User';

const app = express();
const eraseDatabaseOnSync = true;

app.use('/users', User)

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`listening on port ${process.env.SERVER_PORT}`);
  });
});