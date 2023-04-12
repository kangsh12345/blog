import { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';

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
      <h1>Write a post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="id" required ref={idRef} />
        <br />
        <input
          type="text"
          name="title"
          placeholder="title"
          required
          ref={titleRef}
        />
        <br />
        <textarea
          name="content"
          placeholder="content"
          required
          ref={contentRef}
        />
        <br />
        <input type="submit" value="Create" />
      </form>
      {showLink && (
        <Link href={`/posts/${idRef.current?.value}`}>Created Post</Link>
      )}
    </>
  );
}
