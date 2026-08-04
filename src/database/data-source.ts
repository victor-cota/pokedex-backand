//Permite que os comandos de migration funcionem fora do NestJS.
import { DataSource } from 'typeorm';
import { createDatabaseOptions } from './database-options';

export const applicationDataSource = new DataSource(createDatabaseOptions());

export default applicationDataSource;
