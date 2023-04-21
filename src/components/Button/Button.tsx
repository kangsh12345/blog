import { PropsWithChildren } from 'react';

export function Button({ children }: PropsWithChildren<{}>) {
  return (
    <button
      className="bg-black dark:bg-white text-lg dark:text-teal-700 text-teal-200 rounded-lg px-5"
      onClick={() => alert(`thanks to ${children}`)}
    >
      {children}
    </button>
  );
}
