type ErrorProps = {
  error: string | null;
};

function Error({ error }: ErrorProps) {
  return <div>{error}</div>;
}

export default Error;
