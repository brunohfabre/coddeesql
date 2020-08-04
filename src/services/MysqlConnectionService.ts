import mysql, { Connection } from 'mysql2/promise';
import { IConnection } from '../atoms/connections';

let connection: Connection;

async function initializeConnection(
  options: Omit<IConnection, 'name'>,
): Promise<Connection> {
  const response = await mysql.createConnection(options);

  connection = response;

  return response;
}

function terminateConnection(): void {
  if (connection) {
    connection.end();
  }
}

export { connection, initializeConnection, terminateConnection };
