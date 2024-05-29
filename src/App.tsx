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

function App() {
  return (
    <div className="App">
      <ColorSchemeScript />
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <RecoilRoot>
            <HeaderMegaMenu />
            <Router />
            <ToastContainer />
          </RecoilRoot>
        </BrowserRouter>
      </MantineProvider>
    </div>
  );
}

export default App;
