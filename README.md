# next-current-url

[![npm version](https://badge.fury.io/js/next-current-url.svg)](https://badge.fury.io/js/next-current-url)

A React hook to get the current URL in Next.js applications.

Respects client-side route changes and takes into account URL rewrites made by
proxies, load balancers, etc. along the way.

## Installation

```
yarn add next-current-url
```

## Usage

Add the following to your `_app.jsx` file:

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

Then use the hook from anywhere in your application as follows:

```jsx
import { useCurrentUrl } from 'next-current-url';

useCurrentUrl();
// => http://example.com/page
```
