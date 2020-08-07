import styled, { css } from 'styled-components';

export const Container = styled.div`
  flex: 1;
`;

export const NewTabButton = styled.li`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-left: 8px;
  cursor: pointer;
  font-size: 16px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.theme.backgrounds.lightest};
  }

  /* padding: 8px; */
`;

export const TabContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: calc(100vw - 220px);
  height: calc(100vh - 33px);
  overflow-x: auto;

  /* overflow-y: auto; */

  span:nth-child(even) {
    background: ${props => props.theme.backgrounds.darker};
  }

  span {
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background: ${props => props.theme.backgrounds.lighter};
    }
  }
`;

export const TableContainer = styled.div`
  width: calc(100vw - 220px);
  height: calc(100vh - 33px);
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;

  th {
    position: sticky;
    top: 0;
    background: ${props => props.theme.backgrounds.dark};
  }

  th {
    font-weight: 500;
  }

  th,
  td {
    font-size: 14px;
    text-align: left;
    white-space: nowrap;
    padding: 4px 8px;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(odd) {
    background: ${props => props.theme.backgrounds.darker};
  }

  ${props =>
    props.onClick &&
    css`
      &:hover {
        background: ${props.theme.backgrounds.lightest};
        cursor: pointer;
      }
    `}
`;
