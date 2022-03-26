import express, { Request, Response, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { ensureAuthenticated, validateToken } from './middlewares/auth/ensureAuthenticated';
import * as authenticateUserController from './modules/users/controllers/authenticateUserController';

import apiRoutes from './routes';

dotenv.config();

const server = express();

server.use(cors());

server.use(express.json());

server.use(express.urlencoded({ extended: true }));

server.get('/ping', (req: Request, res: Response) => res.json({ pong: true }));
server.post('/login', authenticateUserController.authenticate);
server.post('/validate', validateToken)

server.use(ensureAuthenticated());
server.use(apiRoutes);

server.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(400).json({ error: 'Some error occurred.' });
}

server.use(errorHandler);

server.listen(process.env.PORT, () => console.log("Server is running!"));
