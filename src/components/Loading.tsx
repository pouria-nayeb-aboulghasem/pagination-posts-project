import { RiLoader4Line } from "@remixicon/react";

function Loading() {
  return (
    <div
      role="status"
      className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm text-slate-600"
    >
      <RiLoader4Line
        aria-hidden="true"
        className="animate-spin text-2xl text-indigo-600"
      />
      <p>Loading photos…</p>
    </div>
  );
}

export default Loading;
