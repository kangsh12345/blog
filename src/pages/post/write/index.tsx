import { FormEvent, useRef, useState } from 'react';
import Head from 'next/head';
// import { GetServerSideProps } from 'next';
import Link from 'next/link';

// export const getServerSideProps: GetServerSideProps<{}> = async () => {
//   return { props: {} };
// };

export default function Index() {
  const idRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [showLink, setShowLink] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const id = idRef.current?.value || '';
    const title = titleRef.current?.value || '';
    const contentHtml = contentRef.current?.value || '';

    console.log(title);

    if (id && title && contentHtml) {
      try {
        fetch('/api/post/write', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id,
            title,
            contentHtml,
          }),
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error('Fetch Error');
            }
          })
          .then(data => {
            alert(data.message);
            setShowLink(true);
          });
      } catch {
        (error: any) => alert(`request error: ${error}`);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Write a post</title>
      </Head>
      <h1>Write a post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="id" required ref={idRef} />
        <br />
        <br />
        <input
          type="text"
          name="title"
          placeholder="title"
          required
          ref={titleRef}
        />
        <br />
        <br />
        <textarea
          name="content"
          placeholder="content"
          required
          ref={contentRef}
        />
        <br />
        <input
          className="rounded bg-purple-500 px-2"
          type="submit"
          value="Create"
        />
      </form>
      {showLink && (
        <Link href={`/posts/${idRef.current?.value}`}>Created Post</Link>
      )}
    </>
  );
}

// getStaticProps, getServerSideProps나오기 전에 쓰면 형식이라 잘안씀
// Index.getInitialProps = async () => {
//   return {};
// };
