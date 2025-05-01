
import React from 'react';
import App from '../App';

// This file allows us to be compatible with both Next.js and Vite
// The default export will be used by Next.js
export default function NextApp({ Component, pageProps }: any) {
  return <App />;
}
