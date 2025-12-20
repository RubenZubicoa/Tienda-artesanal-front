import config from './config/config';
import { connectToDatabase } from './db/database';
import server from './server';


server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
    connectToDatabase();
});