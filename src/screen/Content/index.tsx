import React from 'react';
import { useRecoilValue } from 'recoil';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { tablesState } from '../../atoms/connections';

import { Container } from './styles';

const Content: React.FC = () => {
  const tables = useRecoilValue(tablesState);

  return (
    <Container>
      <Tabs>
        <TabList>
          <Tab>tab 1</Tab>
          <Tab>tab 2</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
      {tables.map(table => (
        <span>{table}</span>
      ))}
    </Container>
  );
};

export default Content;
