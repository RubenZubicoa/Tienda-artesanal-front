import express, { type Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import manufacturerRoutes from './routes/manufacturer.routes';

const server: Application = express();

// Middlewares

server.use(morgan('dev'));
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Routes

server.use('/api/manufacturers', manufacturerRoutes);

export default server;