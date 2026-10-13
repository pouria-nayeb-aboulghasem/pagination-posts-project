type ErrorProps = {
  error: string | null;
};

function ErrorMessage({ error }: ErrorProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800"
    >
      <p className="font-semibold">Could not load photos</p>
      <p className="mt-1">{error}</p>
    </div>
  );
}

export default ErrorMessage;
