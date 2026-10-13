type ErrorProps = {
  error: string | null;
};

function ErrorMessage({ error }: ErrorProps) {
<<<<<<< HEAD:src/components/Error.tsx
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800"
    >
      <p className="font-semibold">Could not load photos</p>
      <p className="mt-1">{error}</p>
    </div>
  );
=======
  return <div>{error}</div>;
>>>>>>> e89ff99d9460f8e2ac5de86f43ac012f901c8e0c:src/components/ErrorMessage.tsx
}

export default ErrorMessage;
