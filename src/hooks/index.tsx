import React from 'react'

import { ToastProvider } from './toast'
import { MysqlProvider } from './mysql'

const AppProvider: React.FC = ({ children }) => (
  <ToastProvider>
    <MysqlProvider>
      {children}
    </MysqlProvider>
  </ToastProvider>
)

export default AppProvider
