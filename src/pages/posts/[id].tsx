import { GetStaticPaths, GetStaticProps } from 'next';

import { Date } from '~/components/Date';
import { getAllPostIds, getPostData, PostData } from '~/lib/posts';
import utilStyles from '~/styles/utils.module.css';

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
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </>
  );
}
