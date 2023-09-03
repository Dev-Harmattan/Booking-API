import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoute from './routes/UserRoutes.js';
import residencyRoute from './routes/residencyRouter.js';
import RESPONSE_CODE from './helpers/util.js';
import { ApiResponse } from './models/ApiResponse.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//app middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//router middleware
app.use('/api/user', userRoute);
app.use('/api/residency', residencyRoute);

//Error handler
app.use((err, req, res, next) => {
  const status =
    err.status || err.statusCode || RESPONSE_CODE.INTERNAL_SERVER_ERROR;
  const userMessage = err.userMessage || err.message || 'Unknown error';
  const developerMessage =
    err.developerMessage || err.message || 'Unknown error';
  const moreInfo = err ? err.moreInfo : null;
  res
    .status(status)
    .json(ApiResponse.Build(status, userMessage, developerMessage, moreInfo));
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${server.address().port}`);
});
