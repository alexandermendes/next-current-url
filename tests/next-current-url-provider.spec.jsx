import React from 'react';
import Router from 'next/router';
import { renderToString } from 'react-dom/server';
import { render, act } from '@testing-library/react';
import { NextCurrentUrlProvider, useCurrentUrl } from '../src';

const Component = () => {
  const currentUrl = useCurrentUrl();

  return <p data-testid="current-url">{currentUrl}</p>;
};

jest.mock('next/router', () => ({
  events: {
    on: jest.fn(),
    off: jest.fn(),
  }
}), { virtual: true });

describe('CurrentUrlProvider', () => {
  it('sets and updates the current URL when the route changes', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        ...window.location,
        href: 'http://example.com/page',
      }
    });

    const { getByTestId, unmount } = render(
      <NextCurrentUrlProvider>
        <Component />
      </NextCurrentUrlProvider>
    );

    expect(Router.events.on).toHaveBeenCalledTimes(1);
    expect(Router.events.on).toHaveBeenCalledWith(
      'routeChangeComplete',
      expect.any(Function),
    );

    expect(Router.events.off).not.toHaveBeenCalled();
    expect(getByTestId('current-url').textContent).toBe('http://example.com/page');

    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        href: 'http://example.com/another-page',
      }
    });

    act(Router.events.on.mock.calls[0][1]);

    expect(getByTestId('current-url').textContent).toBe('http://example.com/another-page');

    act(() => { unmount(); });

    expect(Router.events.off).toHaveBeenCalledTimes(1);
    expect(Router.events.off).toHaveBeenCalledWith(
      'routeChangeComplete',
      expect.any(Function),
    );

    expect(Router.events.on.mock.calls[0][0]).toEqual(Router.events.off.mock.calls[0][0]);
  });

  describe('SSR', () => {
    afterEach(() => {
      document.body.innerHTML = '';
    });

    it('respects the initial URL for SSR', () => {
      document.body.innerHTML = renderToString(
        <NextCurrentUrlProvider
          initialUrl="http://initial.com/page"
        >
          <Component />
        </NextCurrentUrlProvider>
      );

      const { textContent } = document.querySelector('[data-testid="current-url"]');

      expect(textContent).toBe('http://initial.com/page');
    });
  });
});
