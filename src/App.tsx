import './App.css';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import { theme } from './theme';
import { HeaderMegaMenu } from './components/HeaderMegaMenu/HeaderMegaMenu';
import Router from './Router';
import queryClient from './state/queryClient';
import { QueryClientProvider } from 'react-query';

function App() {
  return (
    <div className="App">
      <ColorSchemeScript />
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <RecoilRoot>
              <HeaderMegaMenu />
              <Router />
              <ToastContainer />
            </RecoilRoot>
          </BrowserRouter>
        </QueryClientProvider>
      </MantineProvider>
    </div>
  );
}

export default App;
