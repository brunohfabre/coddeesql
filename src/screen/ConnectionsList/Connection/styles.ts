import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  isConnected: boolean;
  isConnectionFailed: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    padding: 16px;
    font-weight: 500;
    cursor: pointer;
  }

  &:hover {
    background: ${props => props.theme.backgrounds.dark};
  }

  svg {
    color: ${props => props.theme.colors.white};
    margin-right: 8px;
  }

  ul {
    padding-bottom: 8px;
  }

  span {
    font-weight: 500;
    padding: 0 16px 16px;

    display: flex;
    align-items: center;

    button {
      font-weight: 500;
      margin-left: 8px;
      background: transparent;
      border: 0;
      color: ${props => props.theme.colors.white};
      text-decoration: underline;
    }
  }

  ${props =>
    props.isConnected &&
    css`
      background: ${props.theme.colors.purple};

      &:hover {
        background: ${props.theme.colors.purple};
      }
    `}

  ${props =>
    props.isConnectionFailed &&
    css`
      background: ${props.theme.colors.red};

      &:hover {
        background: ${props.theme.colors.red};
      }
    `}
`;

interface DatabaseProps {
  isActive: boolean;
}

export const Database = styled.li<DatabaseProps>`
  header {
    position: relative;
    font-weight: 500;
    padding: 12px 16px;
    cursor: pointer;

    &:hover {
      background: ${props => shade(0.1, props.theme.colors.purple)};
    }

    ${props =>
    props.isActive &&
    css`
        &::before {
          position: absolute;
          content: '';
          width: 4px;
          background: ${props => props.theme.colors.pink};
          top: 0;
          bottom: 0;
          left: 0;
        }
      `}
  }

  ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 12px 16px 12px 32px;
    font-weight: 500;

    cursor: pointer;

    &:hover {
      background: ${props => shade(0.1, props.theme.colors.purple)};
    }

    span {
      padding: 0;
      font-size: 12px;
    }
  }
`;
