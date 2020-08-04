import React from 'react';

import ConnectionsList from './ConnectionsList';
import Content from './Content';

import { Container } from './styles';

const Screen: React.FC = () => {
  return (
    <Container>
      <ConnectionsList />
      <Content />
    </Container>
  );
};

export default Screen;
