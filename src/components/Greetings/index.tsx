import React, { useState, useCallback } from 'react'
import { remote } from 'electron'

import { useMysql } from '../../hooks/mysql'

import { Container, Header, Content, List, Button } from './styles'

const Greetings: React.FC = () => {
  const { databases, tables, connect, selectDatabase, loadTables } = useMysql()

  const [host, setHost] = useState('localhost')
  const [user, setUser] = useState('root')
  const [password, setPassword] = useState('')

  const handleConnect = useCallback(() => {
    if (!host) {
      alert('is missing host')
      return
    }
    if (!user) {
      alert('is missing user')
      return
    }
    if (!password) {
      alert('is missing password')
      return
    }
    connect({ host, user, password })
  }, [host, user, password])

  const handleResizable = useCallback(() => {
    const window = remote.getCurrentWindow()

    if (window.isMaximized()) {
      window.unmaximize()
    } else {
      window.maximize()
    }
  }, [])

  return (
    <Container>
      <Header onDoubleClick={handleResizable}>
        <input type="text" placeholder='Host' onChange={e => setHost(e.target.value)} value={host} />
        <input type="text" placeholder='User' onChange={e => setUser(e.target.value)} value={user} />
        <input type="text" placeholder='Password' onChange={e => setPassword(e.target.value)} value={password} />
        <Button onClick={handleConnect}>connect in localhost</Button>
      </Header>

      <Content>
        {!!databases.length && <List><h3>Databases</h3><ul>{databases.map(item => <li><button onClick={() => selectDatabase(item)}>{item}</button></li>)}</ul></List>}
        {!!tables.length && <List><h3>Tables</h3><ul>{tables.map(item => <li>{item}</li>)}</ul></List>}
      </Content>
    </Container>
  )
}

export default Greetings
