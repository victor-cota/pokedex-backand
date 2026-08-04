//Monta a configuração central do TypeORM.

import 'dotenv/config';

import { join } from 'node:path';
import { DataSourceOptions } from 'typeorm';

const requiredDatabaseVariables = [
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_DATABASE',
] as const;

type RequiredDatabaseVariable = (typeof requiredDatabaseVariables)[number];

function getRequiredEnvironmentVariable(
  name: RequiredDatabaseVariable,
): string {
  const value = process.env[name];

  if (!value || value.trim().length === 0) {
    throw new Error(`Variável de ambiente obrigatória não encontrada: ${name}`);
  }

  return value;
}

function getDatabasePort(): number {
  const rawPort = getRequiredEnvironmentVariable('DB_PORT');
  const port = Number(rawPort);

  const isValidPort = Number.isInteger(port) && port >= 1 && port <= 65535;

  if (!isValidPort) {
    throw new Error(
      `DB_PORT precisa ser uma porta válida. Valor recebido: ${rawPort}`,
    );
  }

  return port;
}

export function createDatabaseOptions(): DataSourceOptions {
  return {
    type: 'postgres',

    host: getRequiredEnvironmentVariable('DB_HOST'),
    port: getDatabasePort(),

    username: getRequiredEnvironmentVariable('DB_USERNAME'),
    password: getRequiredEnvironmentVariable('DB_PASSWORD'),
    database: getRequiredEnvironmentVariable('DB_DATABASE'),

    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],

    migrations: [join(__dirname, 'migrations', '*.{ts,js}')],

    synchronize: false,
    migrationsRun: false,
    migrationsTableName: 'typeorm_migrations',

    logging: process.env.DB_LOGGING === 'true',
  };
}
