import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

// const apiRoot = process.env.DM_API_ROOT
const app = express();
app.use(bodyParser.json());
// TODO: figure out DNT compliance.
app.use((_, res, next) => {
  res.set({ Tk: '!' });
  next();
});

// listen for requests
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

export default app;
