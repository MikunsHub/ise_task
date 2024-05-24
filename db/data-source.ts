import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config({ path: "env.local"});

export const dataSourceOptions: DataSourceOptions = {
    "type": "postgres",
    "host": process.env.DATABASE_HOST,
    "port": parseInt(process.env.DATABASE_PORT, 10),
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "migrations": ["dist/db/migrations/{*.ts,*.js}"]
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;