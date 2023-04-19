import { memo } from 'react';

export const Utterances = memo(() => {
  return (
    <section
      ref={elem => {
        if (!elem) {
          return;
        }
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://utteranc.es/client.js';
        scriptElement.async = true;
        scriptElement.setAttribute('repo', 'kangsh12345/blog-comment');
        scriptElement.setAttribute('issue-term', 'pathname');
        scriptElement.setAttribute('theme', 'github-dark-orange');
        scriptElement.crossOrigin = 'anonymous';
        elem.appendChild(scriptElement);
      }}
    />
  );
});
