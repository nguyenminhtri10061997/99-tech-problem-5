
import path from "path";
import { DataSource } from "typeorm";
import EnvConfig from './env/envConfig';

const envConfig = EnvConfig.getInstance();
export const AppDataSource = new DataSource({
    type: "sqlite",
    database: envConfig.DB_NAME || 'resources.db',
    synchronize: true,
    logging: true,
    entities: [path.join(__dirname, '/models/*.ts')],
})
