import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { getAllPostIds, getPostData, PostData } from '~/lib/posts';

export interface Props {
  postData: PostData;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};

export default function Post({ postData }: Props) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
    </>
  );
}
