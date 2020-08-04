import styled from 'styled-components';

export const HostInputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 16px;

  > div {
    margin-top: 0 !important;
  }

  div:first-child {
    flex: 3;
  }

  div + div {
    margin-left: 16px;
  }
`;

export const UsernameInputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 16px;

  > div {
    margin-top: 0 !important;
  }

  /* div:first-child {
    flex: 3;
  } */

  div + div {
    margin-left: 16px;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;

  button {
    padding: 10px 16px;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;

  button {
    &:first-child {
      margin-right: 8px;
    }
  }
`