import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  width: 100%;
  height: 56px;
  background: tomato;
  padding: 8px;
  display: flex;
  align-items: center;

  input {
    margin-right: 8px;
    width: 240px
  }
`

export const Content = styled.div`
  height: calc(100vh - 56px);
  flex: 1;
  display: flex;
`

export const List = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 16px;

  ul {
    height: 100%;
  }
`

export const Button = styled.button`
  padding: 8px 16px;
`

export const Text = styled.p`
  margin-top: 35px;
  font-size: 20px;
  font-weight: bold;
`
