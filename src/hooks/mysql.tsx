import React, { createContext, useCallback, useState, useContext } from 'react'
import mysql from 'mysql'
import { remote } from 'electron'

// interface MysqlDatabasesState {
//   token: string;
//   user: unknown;
// }

interface ConnectCredentials {
  host: string;
  user: string;
  password: string;
}

interface MysqlContextData {
  databases: string[];
  tables: string[];
  connect(data: ConnectCredentials): void;
  selectDatabase(name: string): void;
  loadTables(): void;
}

const MysqlContext = createContext<MysqlContextData>({} as MysqlContextData)

let connection = null

export const MysqlProvider: React.FC = ({ children }) => {
  const [databases, setDatabases] = useState<string[]>([])
  const [tables, setTables] = useState<string[]>([])

  const connect = useCallback(({ host, user, password }) => {
    connection = mysql.createConnection({
      host,
      user,
      password
    })

    connection.connect((err) => {
      if (err) {
        alert('error connecting: ' + err.stack)
        return
      }

      alert('connected as id ' + connection.threadId)
    })

    connection.query('show databases;', (err, results) => {
      if (err) {
        alert('error databases: ' + err)
        return
      }

      setDatabases(results.map(item => item.Database))
    })
  }, [])

  const selectDatabase = useCallback((name) => {
    connection.query(`use ${name};`, (err, results) => {
      if (err) {
        alert('error use database: ' + err)
        return
      }

      const window = remote.getCurrentWindow()

      window.setTitle(name)

      connection.query('show tables;', (err, results) => {
        if (err) {
          alert('error show tables: ' + err)
          return
        }

        setTables(results.map(item => item[`Tables_in_${name}`]))
      })
    })
  }, [])

  const loadTables = useCallback(() => { console.log('load tables') }, [])

  return (
    <MysqlContext.Provider value={{ databases, tables, connect, selectDatabase, loadTables }}>
      {children}
    </MysqlContext.Provider>
  )
}

export function useMysql (): MysqlContextData {
  const context = useContext(MysqlContext)

  if (!context) {
    throw new Error('useMysql must be used within an MysqlProvider')
  }

  return context
}
