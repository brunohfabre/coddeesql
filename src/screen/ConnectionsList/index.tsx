import React, { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';

import { connectionsState } from '../../atoms/connections';

import { Container } from './styles';

import ConnectionFormModal from './ConnectionFormModal';
import Connection from './Connection';

const ConnectionsList: React.FC = () => {
  const connections = useRecoilValue(connectionsState);

  const [connectionFormModalVisible, setConnectionFormModalVisible] = useState(
    false,
  );

  return (
    <>
      <ConnectionFormModal
        visible={connectionFormModalVisible}
        onRequestClose={() => setConnectionFormModalVisible(false)}
      />

      <Container>
        <header>
          <span>Connections</span>

          <button
            type="button"
            onClick={() => setConnectionFormModalVisible(true)}
          >
            <FiPlusCircle size={16} />
          </button>
        </header>

        {connections.map(connection => (
          <Connection key={connection.name} connection={connection} />
        ))}
      </Container>
    </>
  );
};

export default ConnectionsList;
