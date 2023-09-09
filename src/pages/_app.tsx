import React from 'react';
import { Provider } from 'jotai';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
        <Component {...pageProps} />
    </Provider>
  );
};

export default App;
