"use client";

import { useEffect, useState } from "react";
import OtherGraphs from "@/components/OtherGraphs";
import { cn } from "@/lib/utils";

interface Graph {
  id: number;
  name: string;
}

export default function OthersPage() {
  const [allGraphs, setAllGraphs] = useState<Graph[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://158.247.251.66:8081/api/graph");
        if (!res.ok) throw new Error("Fetch 실패");

        const data = await res.json();
        const graphs: Graph[] = data.graphs ?? [];

        setAllGraphs(graphs);
      } catch (err) {
        console.error("데이터 fetch 실패:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={cn("flex w-full h-[calc(100vh-6rem)] justify-center items-center flex-col")}>
      <div
        className={cn(
          "flex",
          allGraphs.length > 3 && "mt-[10rem]",
          "flex-wrap w-full h-full justify-center items-center gap-[1rem]"
        )}
      >
        {allGraphs.map(({ id, name }) => (
          <OtherGraphs key={id} name={name} id={id} />
        ))}
      </div>
    </div>
  );
}