import { ReactElement, ReactNode, useState } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { formatDistanceToNow } from 'date-fns';

import { ErrorBoundary } from '~/components/ErrorBoundary/ErrorBoundary';
import { Layout } from '~/components/Layout';

import '~/styles/global.css';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [visitedTime] = useState(new Date());

  const getLayout =
    Component.getLayout ||
    (page => <Layout home={router.pathname === '/'}>{page}</Layout>);
  return (
    <>
      {getLayout(
        <>
          <div>
            visited:{' '}
            {formatDistanceToNow(new Date(visitedTime), {
              addSuffix: true,
              includeSeconds: true,
            })}
          </div>
          <ErrorBoundary fallbackComponent={<div>...</div>}>
            <Component {...pageProps} />
          </ErrorBoundary>
        </>,
      )}
    </>
  );
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
