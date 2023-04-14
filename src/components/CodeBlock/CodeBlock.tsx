import { PropsWithChildren } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { rainbow } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

interface CopyButtonProps {
  target: string;
}

const CopyButton = ({ target }: CopyButtonProps) => {
  const handleCopy = async () => {
    if (target) {
      try {
        await navigator.clipboard.writeText(target);
        alert('copied');
      } catch (error) {
        alert(`copy failed ${error}`);
      }
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-1 top-1 rounded-md px-2 bg-white dark:bg-gray-800"
    >
      copy
    </button>
  );
};

export function CodeBlock({ children }: PropsWithChildren<{}>) {
  const codeArray = Array.isArray(children) ? children : [children];
  const codeString = codeArray.join('\n');

  return (
    <div className="relative">
      <CopyButton target={codeString} />
      <SyntaxHighlighter language="javascript" style={rainbow} showLineNumbers>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}
