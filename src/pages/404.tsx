import { ErrorLayout } from '~/components/Layout';

export default function NotFound() {
  return <div>내용을 찾을 수 없습니다. (URL을 확인해주세요)</div>;
}

NotFound.getLayout = function getLayout(page: React.ReactElement) {
  return <ErrorLayout>{page}</ErrorLayout>;
};
