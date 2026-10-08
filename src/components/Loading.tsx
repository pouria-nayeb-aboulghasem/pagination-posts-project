import { RiLoader4Line } from "@remixicon/react";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center my-4 text-2xl">
      <RiLoader4Line className="animate-spin" />
      <p>Processing…</p>
    </div>
  );
}

export default Loading;
