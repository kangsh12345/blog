import { FormEvent, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
// import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

// export const getServerSideProps: GetServerSideProps<{}> = async () => {
//   return { props: {} };
// };

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      console.log(JSON.stringify(router));
    }
    router.prefetch('/posts/ssg-ssr');
  }, [router]);

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
      <br />
      <br />
      <button
        onClick={() =>
          // router.push('/posts/[id]', '/posts/ssg-ssr', { scroll: false })
          router.push({ pathname: '/posts/[id]', query: { id: 'ssg-ssr' } })
        }
      >
        router.push
      </button>
      <br />
      <br />
      <button onClick={() => router.replace('posts/ssg-ssr')}>
        router.replace
      </button>
      <br />
      <br />
      <button onClick={() => router.back()}>router.back</button>
      <br />
      <br />
      <button onClick={() => router.reload()}>router.reload</button>
    </>
  );
}

// getStaticProps, getServerSideProps나오기 전에 쓰면 형식이라 잘안씀
// Index.getInitialProps = async () => {
//   return {};
// };
