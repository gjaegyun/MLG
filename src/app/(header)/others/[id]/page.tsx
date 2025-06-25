'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Chart from "@/components/Chart";
import DetailTextBox from "@/components/DetailTextBox";
import { DownArrow } from "@/assets/svg";

interface GraphData {
  name: string;
  moodToNumber: string[];
  messages: string[];
  age: number[];
}

export default function DetailGraphPage() {
  const { id } = useParams() as { id: string };
  const [data, setData] = useState<GraphData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://158.247.251.66:8081/api/graph/${id}`);
        if (!res.ok) throw new Error("데이터 요청 실패");

        const result = await res.json();

        if (
          result.name &&
          Array.isArray(result.graphDto)
        ) {
          const moodToNumber = result.graphDto.map((item: any) => item.moodIndex.toString());
          const messages = result.graphDto.map((item: any) => item.content);
          const age = result.graphDto.map((item: any) => item.age);

          setData({
            name: result.name,
            moodToNumber,
            messages,
            age
          });
        } else {
          console.warn("잘못된 데이터 구조:", result);
        }
      } catch (err) {
        console.error("그래프 데이터 fetch 실패:", err);
      }
    };

    fetchData();
  }, [id]);

  const scrollToTextBox = () => {
    document.querySelector('#textBox')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className={cn('flex', 'w-full', 'h-[calc(100vh-6rem)]', 'justify-center', 'items-center', 'flex-col')}>
        <div className={cn('flex', 'relative', 'w-full', 'h-full', 'justify-center', 'items-center', 'flex-col')}>
          <div className={cn('flex', 'flex-col', 'w-full', 'items-center', 'justify-center')}>
            <p className={cn('text-3xl', 'font-bold')}>
              {data?.name ?? "로딩 중..."}님의 인생 그래프
            </p>
            <div className={cn('flex', 'w-[60rem]', 'flex-col', 'h-[35rem]')}>
              {data && (
                <Chart
                  moodToNumber={data.moodToNumber}
                  messages={data.messages}
                  age={data.age}
                />
              )}
            </div>
            <div
              onClick={scrollToTextBox}
              className={cn(
                'absolute', 'bottom-0', 'flex', 'flex-col',
                'items-center', 'gap-[0.25rem]', 'cursor-pointer'
              )}
            >
              <p className={cn('text-md')}>스크롤 해서 텍스트로 보기</p>
              <div className={cn('animate-bounce')}>
                <DownArrow />
              </div>
            </div>
          </div>
        </div>
      </div>
      {data && (
        <div id="textBox" className={cn('flex', 'w-full', 'h-full', 'justify-center', 'items-center')}>
          <DetailTextBox
            name={data.name}
            messages={data.messages}
            age={data.age}
          />
        </div>
      )}
    </>
  );
}