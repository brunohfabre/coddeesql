import React, { useCallback } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { tablesState, databaseActiveState } from '../../atoms/connections';
import { currentTabSelectedState } from '../../atoms/tabs';
import { tableSelectedState } from '../../atoms/tables';

import { useMysql } from '../../hooks/mysql';

import { Container, TableContainer, Table, TableRow } from './styles';

const Content: React.FC = () => {
  const [currentTab, setCurrentTab] = useRecoilState(currentTabSelectedState);
  const [tableSelected, setTableSelected] = useRecoilState(tableSelectedState);

  const databaseActive = useRecoilValue(databaseActiveState);
  const tables = useRecoilValue(tablesState);

  const { connection } = useMysql();

  const handleSelectTable = useCallback(
    async table => {
      try {
        await connection?.query(`USE ${databaseActive};`);

        const [results, fields] = await connection?.query(
          `select * from ${table};`,
        );

        setTableSelected({
          name: table,
          header: fields.map(field => field.name),
          rows: results,
        });

        setCurrentTab(1);
      } catch (err) {
        alert(err.message);
      }
    },
    [setTableSelected, setCurrentTab, connection, databaseActive],
  );

  return (
    <Container id="container">
      <Tabs selectedIndex={currentTab} onSelect={setCurrentTab}>
        <TabList>
          {!!tables.length && <Tab>Tables</Tab>}
          {tableSelected.name && <Tab>{tableSelected.name}</Tab>}

          {/* <NewTabButton onClick={() => alert('add new tab')}>+</NewTabButton> */}
        </TabList>

        <TabPanel>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Rows</th>
                </tr>
              </thead>

              <tbody>
                {tables.map(row => (
                  <TableRow onClick={() => handleSelectTable(row.table_name)}>
                    <td>{row.table_name}</td>
                    <td>{row.table_rows}</td>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </TabPanel>

        {tableSelected.name && (
          <TabPanel>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    {tableSelected.header.map(item => (
                      <th>{item}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {tableSelected.rows.map(row => (
                    <TableRow>
                      {Object.keys(row).map(item => (
                        <td>{String(row[item])}</td>
                      ))}
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </TabPanel>
        )}
      </Tabs>
    </Container>
  );
};

export default Content;
