import mysql from 'mysql2/promise';

import { IConnection } from '../../atoms/connections';

export function testConnection(options: IConnection): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const connection = await mysql.createConnection(options);

    console.log(connection);
  });
}
