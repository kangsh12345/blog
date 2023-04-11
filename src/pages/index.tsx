import Head from 'next/head';

import Layout, { siteTitle } from '~/components/Layout';

import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout home>{page}</Layout>;
};
