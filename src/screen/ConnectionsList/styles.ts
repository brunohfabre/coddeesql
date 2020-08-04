import styled from 'styled-components';

export const Container = styled.div`
  width: 240px;
  background: ${props => props.theme.backgrounds.darker};
  border: 1px solid #322d41;
  height: 100%;

  header {
    padding-left: 16px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      text-transform: uppercase;
      color: ${props => props.theme.colors.white};
      font-weight: 500;
    }

    button {
      background: transparent;
      height: 48px;
      width: 48px;
      border: 0;

      color: ${props => props.theme.colors.white};
    }
  }

  .connection-actions-menu {
    width: 220px;
    z-index: 1;
    padding: 8px 0;
    background: ${props => props.theme.backgrounds.darker};
    border: 1px solid ${props => props.theme.backgrounds.lightest};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    > div {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      cursor: pointer;

      :hover {
        background: ${props => props.theme.backgrounds.dark};
      }

      > svg {
        margin-right: 8px;
        color: #9696a7;
      }
    }
  }
`;
