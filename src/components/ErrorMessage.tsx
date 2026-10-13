type ErrorProps = {
  error: string | null;
};

function ErrorMessage({ error }: ErrorProps) {
  return <div>{error}</div>;
}

export default ErrorMessage;
