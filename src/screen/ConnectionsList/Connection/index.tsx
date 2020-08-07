import React, { useState, useCallback, useMemo } from 'react';
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu';
import { FiActivity, FiDatabase, FiTrash } from 'react-icons/fi';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import { useMysql } from '../../../hooks/mysql';
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

import { Container, Database } from './styles';

interface ConnectionProps {
  connection: IConnection;
}

const Connection: React.FC<ConnectionProps> = ({ connection }) => {
  const setConnections = useSetRecoilState(connectionsState);
  const currentConnection = useRecoilValue(currentConnectionState);
  const connectionError = useRecoilValue(connectionErrorState);
  const databases = useRecoilValue(databasesState);
  const [databaseActive, setDatabaseActive] = useRecoilState(
    databaseActiveState,
  );
  const setTables = useSetRecoilState(tablesState);

  const { connection: mysqlConnection, connect } = useMysql();
  const { addToast } = useToast();

  const isConnected = useMemo(
    () => currentConnection.name === connection.name,
    [connection.name, currentConnection.name],
  );

  const isConnectionFailed = useMemo(
    () => connectionError.name === connection.name,
    [connectionError.name, connection.name],
  );

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
    await connect(connection);
  }, [connect, connection]);

  const handleSetDatabaseActive = useCallback(
    async databaseName => {
      try {
        await mysqlConnection?.query(`USE ${databaseName};`);

        const [results] = await mysqlConnection?.query('SHOW tables;');

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
    [setDatabaseActive, addToast, mysqlConnection],
  );

  const handleSelectTables = useCallback(
    async databaseName => {
      try {
        const [results] = await mysqlConnection.query(`
          SELECT table_name, table_rows
            FROM INFORMATION_SCHEMA.TABLES
          WHERE TABLE_SCHEMA = '${databaseName}';
        `);

        setTables(results);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Deu ruim',
          description: err.message,
        });
      }
    },
    [setTables, addToast, mysqlConnection],
  );

  return (
    <>
      <ContextMenuTrigger id={`connection_actions_menu:${connection.name}`}>
        <Container
          onClick={handleClick}
          isConnected={isConnected}
          isConnectionFailed={isConnectionFailed}
        >
          <div>
            <FiDatabase size={16} /> {connection.name}
          </div>

          {isConnected && !!databases.length && (
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

          {isConnectionFailed && (
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
        {/* {isConnected ? (
          <MenuItem onClick={handleDelete}>
            <FiActivity />
            Disconnect
          </MenuItem>
        ) : (
            <MenuItem onClick={handleDelete}>
              <FiActivity />
            Connect
            </MenuItem>
          )} */}

        <MenuItem onClick={handleDelete}>
          <FiTrash />
          Delete connection
        </MenuItem>
      </ContextMenu>
    </>
  );
};

export default Connection;
