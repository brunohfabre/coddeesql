import { atom } from 'recoil';
import { connections } from '../store/connections';

export interface IConnection {
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
}

export const connectionsState = atom<IConnection[]>({
  key: 'connections',
  default: connections.get('connections') as IConnection[],
});

export const currentConnectionState = atom<IConnection>({
  key: 'currentConnection',
  default: {} as IConnection,
});

export const connectionErrorState = atom<IConnection>({
  key: 'connectionError',
  default: {} as IConnection,
});

export const databasesState = atom<string[]>({
  key: 'databases',
  default: [],
});

export const databaseActiveState = atom<string | undefined>({
  key: 'databaseActive',
  default: undefined,
});

export const tablesState = atom<string[]>({
  key: 'tables',
  default: [],
});
