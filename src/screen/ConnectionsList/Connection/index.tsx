import React, { useState, useCallback } from 'react';
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu';
import { FiDatabase, FiTrash } from 'react-icons/fi';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { useToast } from '../../../hooks/toast';

import { connections } from '../../../store/connections';
import {
  IConnection,
  connectionsState,
  currentConnectionState,
  connectionErrorState,
  databasesState,
  databaseActiveState,
  tablesState,
} from '../../../atoms/connections';

import {
  connection as mysqlConnection,
  initializeConnection,
} from '../../../services/MysqlConnectionService';

import { Container, Database } from './styles';

interface ConnectionProps {
  connection: IConnection;
}

const Connection: React.FC<ConnectionProps> = ({ connection }) => {
  const setConnections = useSetRecoilState(connectionsState);
  const [currentConnection, setCurrentConnection] = useRecoilState(
    currentConnectionState,
  );
  const [connectionError, setConnectionError] = useRecoilState(
    connectionErrorState,
  );
  const [databases, setDatabases] = useRecoilState(databasesState);
  const [databaseActive, setDatabaseActive] = useRecoilState(
    databaseActiveState,
  );
  const setTables = useSetRecoilState(tablesState);

  const { addToast } = useToast();

  const [tableCount, setTableCount] = useState(0);

  const handleDelete = useCallback(() => {
    const currentConnections = connections.get('connections') as Array<
      IConnection
    >;

    const foundIndex = currentConnections.findIndex(
      findConnection => findConnection.name === connection.name,
    );

    if (foundIndex > -1) {
      currentConnections.splice(foundIndex, 1);
    }

    connections.set('connections', currentConnections);

    setConnections(currentConnections);
  }, [connection, setConnections]);

  const handleClick = useCallback(async () => {
    try {
      const { name, host, port, user, password } = connection;

      const response = await initializeConnection({
        host,
        port,
        user,
        password,
      });

      const [results] = await response.query('SHOW databases;');

      setDatabases(results.map(item => item.Database));

      if (connectionError.name === name) {
        setConnectionError({});
      }

      setCurrentConnection(connection);
    } catch (err) {
      setConnectionError(connection);
    }
  }, [
    connection,
    setCurrentConnection,
    setConnectionError,
    connectionError,
    setDatabases,
  ]);

  const handleSetDatabaseActive = useCallback(
    async databaseName => {
      try {
        await mysqlConnection.query(`USE ${databaseName};`);

        const [results] = await mysqlConnection.query('SHOW tables;');

        setTableCount(results.length);

        setDatabaseActive(databaseName);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Deu ruim',
          description: err.message,
        });
      }
    },
    [setDatabaseActive, addToast],
  );

  const handleSelectTables = useCallback(
    async databaseName => {
      try {
        await mysqlConnection.query(`USE ${databaseName};`);

        const [results] = await mysqlConnection.query('SHOW tables;');

        setTables(results.map(table => table[`Tables_in_${databaseName}`]));
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Deu ruim',
          description: err.message,
        });
      }
    },
    [setTables, addToast],
  );

  return (
    <>
      <ContextMenuTrigger id={`connection_actions_menu:${connection.name}`}>
        <Container
          onClick={handleClick}
          isConnected={currentConnection.name === connection.name}
          isErrored={connectionError.name === connection.name}
        >
          <div>
            <FiDatabase size={16} /> {connection.name}
          </div>

          {currentConnection.name === connection.name && !!databases.length && (
            <ul>
              {databases.map(database => (
                <Database
                  onClick={() => handleSetDatabaseActive(database)}
                  isActive={database === databaseActive}
                >
                  <header>{database}</header>

                  {database === databaseActive && (
                    <ul>
                      <li onClick={() => handleSelectTables(database)}>
                        Tables <span>{tableCount}</span>
                      </li>
                    </ul>
                  )}
                </Database>
              ))}
            </ul>
          )}

          {connectionError.name === connection.name && (
            <span>
              Connection failed.
              <button type="button" onClick={handleClick}>
                Retry?
              </button>
            </span>
          )}
        </Container>
      </ContextMenuTrigger>

      <ContextMenu
        id={`connection_actions_menu:${connection.name}`}
        className="connection-actions-menu"
      >
        <MenuItem onClick={handleDelete}>
          <FiTrash />
          Delete connection
        </MenuItem>
      </ContextMenu>
    </>
  );
};

export default Connection;
