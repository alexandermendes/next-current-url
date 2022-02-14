import React from 'react';
import Router from 'next/router';
import { CurrentUrlProvider } from 'use-current-url';

export const NextCurrentUrlProvider = ({
  children,
  initialUrl,
}) => (
  <CurrentUrlProvider
    initialUrl={initialUrl}
    onMount={(updateCurrentUrl) => { Router.events.on('routeChangeComplete', updateCurrentUrl); }}
    onUnmount={(updateCurrentUrl) => { Router.events.off('routeChangeComplete', updateCurrentUrl); }}
  >
    {children}
  </CurrentUrlProvider>
);
