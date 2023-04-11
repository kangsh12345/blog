// import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';

import Layout, { siteTitle } from '~/components/Layout';
import { PostData } from '~/lib/posts';

import utilStyles from '../styles/utils.module.css';

// interface Props {
//   allPostsData: PostData[];
// }

// export const getStaticProps: GetServerSideProps<Props> = async () => {
//   const allPostsData = getSortedPostsData();

//   return {
//     props: {
//       allPostsData,
//     },
//   };
// };

export default function Home() {
  const [allPostsData, setAllPostsData] = useState<PostData[]>([]);
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setAllPostsData(data.allPostsData);
        console.log(data);
      });
  }, []);

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>🧑‍💻 Frontend Engineer / Web Developer</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout home>{page}</Layout>;
};
