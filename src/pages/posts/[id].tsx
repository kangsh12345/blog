import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
// import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { MDXRemote } from 'next-mdx-remote';

import { Button } from '~/components/Button';
import { CodeBlock } from '~/components/CodeBlock';
import { Date } from '~/components/Date';
import { getAllPostIds, getPostData, PostData } from '~/lib/posts';
import utilStyles from '~/styles/utils.module.css';

import { siteTitle } from '../_document';

// const Button = dynamic(
//   () => import('~/components/Button').then(mod => mod.Button),
//   {
//     loading: () => <div>Loadding...</div>,
//   },
// );

export interface Props {
  postData: PostData;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
  preview,
}) => {
  console.log(`>>>>>> ${preview}`);

  const postData = await getPostData(params?.id as string);

  return {
    props: {
      postData,
    },
  };
};

const components = { Button, CodeBlock };

const ErrorComponent = () => {
  const [error, setError] = useState(false);

  if (error) {
    console.log('발생');
    throw new Error('Error occured');
  }

  return (
    <button
      className="rounded px-2 bg-green-500"
      onClick={() => setError(true)}
    >
      Error Fire
    </button>
  );
};

export default function Post({ postData }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{`${postData.title} - ${siteTitle}`}</title>
      </Head>
      <ErrorComponent />
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <br />
        {postData.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        )}
        {postData.mdxSource && (
          <MDXRemote {...postData.mdxSource} components={components} />
        )}
      </article>
    </>
  );
}
