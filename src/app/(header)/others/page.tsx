"use client";

import { useEffect, useState } from "react";
import OtherGraphs from "@/components/OtherGraphs";
import { cn } from "@/lib/utils";

const baseGraphNames = ["김재균", "엄지성", "김주은"];

export default function OthersPage() {
  const [allGraphNames, setAllGraphNames] = useState<string[]>(baseGraphNames);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("DATA_SINGLE");

      if (raw) {
        const parsed = JSON.parse(raw);
        const name = parsed?.name;

        if (typeof name === "string" && name.trim() !== "") {
          setAllGraphNames((prev) => {
            if (prev.includes(name)) return prev;
            return [...prev, name];
          });
        }
      }
    } catch (err) {
      console.error("DATA_SINGLE 파싱 실패:", err);
    } finally {
      setIsReady(true);
    }
  }, []);

  if (!isReady) return null;

  return (
    <div className={cn("flex", "w-full", "h-[calc(100vh-6rem)]", "justify-center", "items-center", "flex-col")}>
      <div className={cn("flex", allGraphNames.length > 3 && 'mt-[10rem]', 'flex-wrap', "w-full", "h-full", "justify-center", "items-center", "gap-[1rem]")}>
        {allGraphNames.map((name, index) => (
          <OtherGraphs key={name} name={name} id={index} />
        ))}
      </div>
    </div>
  );
}