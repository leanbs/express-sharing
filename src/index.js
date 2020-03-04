import 'dotenv/config';
import express from 'express';
import models, { sequelize } from './models';

const app = express();
const eraseDatabaseOnSync = true;

app.get('/', (req, res) => {
  res.send('Hehe');
})

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`listening on port ${process.env.SERVER_PORT}`);
  });
});