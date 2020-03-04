import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import models, { sequelize } from './models';
import User from './controllers/User';

const app = express();
const eraseDatabaseOnSync = false;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.context = {
    models,
  };

  next();
});

app.use('/users', User)

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`listening on port ${process.env.SERVER_PORT}`);
  });
});