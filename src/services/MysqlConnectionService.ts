import mysql, { Connection } from 'mysql2'

let connection: Connection

interface ConnectionData {
  host: string;
  user: string;
  password?: string;
}

function initializeConnection (options: ConnectionData): void {
  connection = mysql.createConnection(options)

  connection.connect()
}

function terminateConnection (): void {
  if (connection) {
    connection.end()
  }
}

export {
  connection,
  initializeConnection,
  terminateConnection
}
