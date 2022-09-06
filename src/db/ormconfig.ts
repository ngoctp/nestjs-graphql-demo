import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { getDatabaseConfig } from '../config/database.config';

dotenv.config();

const db = getDatabaseConfig();

export const connectionSource = new DataSource({
  type: 'mysql',
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
