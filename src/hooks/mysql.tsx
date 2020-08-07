import React, { createContext, useCallback, useState, useContext } from 'react';
import mysql, { Connection } from 'mysql2/promise';

import { useSetRecoilState, useRecoilState } from 'recoil';
import {
  IConnection,
  connectionErrorState,
  databasesState,
  currentConnectionState,
} from '../atoms/connections';

import { useToast } from './toast';

interface MysqlContextData {
  connection: Connection | undefined;
  connect(options: IConnection): Promise<void>;
}

const MysqlContext = createContext<MysqlContextData>({} as MysqlContextData);

export const MysqlProvider: React.FC = ({ children }) => {
  const [connectionError, setConnectionError] = useRecoilState(
    connectionErrorState,
  );
  const setDatabases = useSetRecoilState(databasesState);
  const setCurrentConnection = useSetRecoilState(currentConnectionState);

  const [connection, setConnection] = useState<Connection | undefined>();

  const { addToast } = useToast();

  const connect = useCallback(
    async options => {
      try {
        const { host, port, user, password, name } = options;
        const connectionResult = await mysql.createConnection({
          host,
          port,
          user,
          password,
        });

        setConnection(connectionResult);

        const [results] = await connectionResult.query('show databases;');

        setDatabases(results.map(item => item.Database));

        if (connectionError.name === name) {
          setConnectionError({} as IConnection);
        }

        setCurrentConnection(options);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Deu ruim',
          description: err.message,
        });

        setConnectionError(options);
      }
    },
    [
      addToast,
      setConnectionError,
      connectionError.name,
      setCurrentConnection,
      setDatabases,
    ],
  );

  return (
    <MysqlContext.Provider value={{ connection, connect }}>
      {children}
    </MysqlContext.Provider>
  );
};

export function useMysql(): MysqlContextData {
  const context = useContext(MysqlContext);

  if (!context) {
    throw new Error('useMysql must be used within an MysqlProvider');
  }

  return context;
}
