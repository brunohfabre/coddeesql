import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import Modal from 'react-modal';

import AppProvider from './hooks';
import { defaultTheme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';

import Screen from './screen';

Modal.setAppElement('#root');

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={defaultTheme}>
        <AppProvider>
          <GlobalStyle />

          <Screen />
        </AppProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
};

render(<App />, document.getElementById('root'));
