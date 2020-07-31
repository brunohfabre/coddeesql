import React from 'react'

import { MysqlProvider } from './mysql'

const AppProvider: React.FC = ({ children }) => (
  <MysqlProvider>{children}</MysqlProvider>
)

export default AppProvider
