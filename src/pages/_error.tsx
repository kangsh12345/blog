import { NextPageContext } from 'next';
import ErrorNext from 'next/error';

interface Props {
  statusCode?: number;
}

function Error({ statusCode }: Props) {
  if (statusCode === 404) {
    return (
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    );
  } else if (statusCode) {
    return <ErrorNext statusCode={statusCode} />;
  }
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
