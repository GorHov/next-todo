import React from 'react';
import { Provider } from 'jotai';
import type { AppProps } from 'next/app';
import AuthModal from '@/components/AuthModal';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
        <AuthModal />
        <Component {...pageProps} />
    </Provider>
  );
};

export default App;
