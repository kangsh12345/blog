import { PropsWithChildren, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import utilStyles from '~/styles/utils.module.css';

import styles from './layout.module.css';

const name = 'NOT FOUND';

export function ErrorLayout({ children }: PropsWithChildren<{}>) {
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') === 'dark'
        ? 'dark'
        : 'light'
      : 'light',
  );

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      if (theme === 'dark') {
        body.classList.add('dark');
      } else {
        body.classList.remove('dark');
      }
    }
  }, [theme]);

  const handleClick = () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  return (
    <div className="bg-purple-50 dark:bg-black text-gray-800 dark:text-gray-200 min-h-screen max-h-max">
      <div className={styles.container}>
        <button className="w-12 px-2" onClick={handleClick}>
          {theme !== 'dark' ? (
            <Image
              src="/images/light-mode.svg"
              alt="light"
              width={28}
              height={28}
            />
          ) : (
            <Image
              src="/images/dark-mode.svg"
              alt="dark"
              width={28}
              height={28}
            />
          )}
        </button>
        <header className={styles.header}>
          <Image
            priority
            src="/images/error.svg"
            className={utilStyles.borderCircle}
            height={144}
            width={144}
            alt=""
          />
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </header>
        <main>{children}</main>
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
