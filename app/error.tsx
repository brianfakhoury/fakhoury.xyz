"use client";

import { RefreshCcw } from "lucide-react";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="prose dark:prose-invert">
      <h1>We&apos;ve broken down.</h1>
      <p>
        My website encountered an error where it was not expecting one. We do
        not know what do now, but rest assured that I will see the details on my
        end.
      </p>
      <p>
        In the meantime, this button below is the best we can do to work
        together. Give it a press. If that doesn&apos;t work, you will have to
        reload the page on your own. If that doesn&apos;t work, then I hope I
        can find a fix that will send you on the correct path next time you come
        down here.
      </p>
      <p>-Brian</p>
      <button
        onClick={() => reset()}
        className="flex items-center p-3 rounded-lg border"
      >
        <RefreshCcw className="mr-1" /> Try again
      </button>
    </div>
  );
}
