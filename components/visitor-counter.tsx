"use client";

import { useEffect, useState } from "react";

type Data = { count: number | null; flag: string };

export function VisitorCounter() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch("/api/visitors")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <span className="flex items-center gap-1.5 text-[10px] text-ink-mute">
      {data.flag}
      {data.count != null ? (
        <>
          you&apos;re visitor{" "}
          <span className="text-accent font-mono">#{data.count.toLocaleString()}</span>
        </>
      ) : (
        "visiting from afar"
      )}
    </span>
  );
}
