# next-current-url

[![npm version](https://badge.fury.io/js/use-current-url.svg)](https://badge.fury.io/js/use-current-url)

A React hook to get the current URL in Next.js applications.

Takes into account URL rewrites made by proxies, load balancers, etc. along
the way (as long as these append special HTTP headers to the request).

## Installation

```
yarn add next-current-url
```

## Usage

In its most basic form the `useCurrentUrl()` hook will, on mount, return the current URL:

```jsx
import { useCurrentUrl } from 'next-current-url';

useCurrentUrl();
// => http://example.com/page
```

If your application uses server-side rendering you can pass in the initial URL
via the `NextCurrentUrlProvider` component. A good place to do this would be
your `_app.jsx`:

```jsx
import { getCurrentUrl, NextCurrentUrlProvider } from 'next-current-url';

const App = ({
  children,
  initialUrl,
}) => (
  <NextCurrentUrlProvider
    initialUrl={initialUrl}
  >
    {children}
  </NextCurrentUrlProvider>
);

App.getInitialProps = ({ req }) => (
  initialUrl: getCurrentUrl(req),
);

export default App;
```
