import React from 'react';
import { Provider } from 'jotai';
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
        <Component {...pageProps} />
    </Provider>
  );
};

export default App;
