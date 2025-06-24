'use client';

import { DownArrow } from "@/assets/svg";
import { Button } from "@/components/Button";
import Chart from "@/components/Chart";
import MiniGraph from "@/components/MiniGraph";
import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";

interface Graph {
  id: number;
  name: string;
}

interface GraphDetail {
  name: string;
  moodToNumber: string[];
  messages: string[];
  age: number[];
}

export default function ComparisionPage() {
  const [allGraphs, setAllGraphs] = useState<Graph[]>([]);
  const [selectedGraphs, setSelectedGraphs] = useState<number[]>([]);
  const [graphDetails, setGraphDetails] = useState<GraphDetail[]>([]);

  const [titleVisible, setTitleVisible] = useState(false);
  const [showGraphList, setShowGraphList] = useState(false);
  const [isAbleScrollBtn, setIsAbleScrollBtn] = useState(false);

  const scrollToElement = (element: string) => {
    document.querySelector(element)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToSection2 = () => {
    scrollToElement('#graphs');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://158.247.251.66:8081/api/graph");
        if (!res.ok) throw new Error("Fetch 실패");

        const data = await res.json();
        const graphs: Graph[] = data.graphs ?? [];

        setAllGraphs(graphs);
      } catch (err) {
        console.error("데이터 fetch 실패:", err);
      }
    };

    fetchData();

    const t1 = setTimeout(() => {
      setTitleVisible(true);
    }, 100);

    const t2 = setTimeout(() => {
      setShowGraphList(true);
    }, 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleGraphClick = (id: number) => {
    setSelectedGraphs((prev) => {
      if (prev.includes(id)) {
        return prev.filter((gid) => gid !== id);
      } else {
        if (prev.length < 2) {
          return [...prev, id];
        } else {
          return prev;
        }
      }
    });
  };

  const handleConfirmClick = async () => {
    if (selectedGraphs.length !== 2) return;

    try {
      const responses = await Promise.all(
        selectedGraphs.map((id) =>
          fetch(`http://158.247.251.66:8081/api/graph/${id}`)
        )
      );

      responses.forEach((res, idx) => {
        if (!res.ok) {
          throw new Error(`ID ${selectedGraphs[idx]} 데이터 요청 실패`);
        }
      });

      const results = await Promise.all(responses.map((res) => res.json()));

      const parsedDetails: GraphDetail[] = results.map((result) => ({
        name: result.name,
        moodToNumber: result.graphDto.map((item: any) => item.moodIndex.toString()),
        messages: result.graphDto.map((item: any) => item.content),
        age: result.graphDto.map((item: any) => item.age),
      }));

      setGraphDetails(parsedDetails);
      setIsAbleScrollBtn(true);
    } catch (err) {
      console.error("그래프 데이터 fetch 실패:", err);
    }
  };

  return (
    <>
      <div className={cn('flex', 'w-full', 'h-[calc(100vh-6rem)]', 'justify-center', 'items-center', 'flex-col')}>
        <div className={cn('flex', 'flex-col', 'w-full', 'h-full', 'justify-center', 'items-center', 'relative')}>

          <div
            className={cn(
              'flex', 'flex-col', 'justify-center', 'items-center',
              'transition-all', 'duration-700', 'ease-out',
              titleVisible ? 'opacity-100 translate-y-[-6rem]' : 'opacity-0 translate-y-0'
            )}
          >
            <p className={cn('text-3xl', 'font-bold')}>
              비교해보기
            </p>
            <p className={cn('text-xl', 'font-bold')}>
              서로 다른 두 그래프를 비교해보세요!
            </p>
          </div>

          <div
            className={cn(
              'flex', 'gap-[1rem]', 'mt-4', 'flex-wrap', 'justify-center',
              'transition-all', 'duration-700', 'ease-out',
              showGraphList ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {allGraphs.map(({ id, name }) => {
              const isSelected = selectedGraphs.includes(id);
              return (
                <div
                  key={id}
                  onClick={() => handleGraphClick(id)}
                  className="cursor-pointer"
                >
                  <MiniGraph name={name} selected={isSelected} />
                </div>
              );
            })}
          </div>

          <div
            onClick={scrollToSection2}
            className={cn(
              'absolute', 'bottom-0', 'flex', 'flex-col', 'items-center', 'gap-[0.25rem]', 'cursor-pointer'
            )}
          >
            {isAbleScrollBtn ? (
              <div className={cn('flex', 'gap-[0.25rem]', 'justify-center', 'items-center', 'flex-col')}>
                <p className={cn('text-md')}>그래프 확인하기</p>
                <div className={cn('animate-bounce')}>
                  <DownArrow />
                </div>
              </div>
            ) : (
              <Button
                onClick={handleConfirmClick}
                variant='blue'
                disabled={selectedGraphs.length !== 2}
              >
                확인
              </Button>
            )}
          </div>
        </div>
      </div>

      {isAbleScrollBtn && graphDetails.length === 2 && (
        <div id="graphs" className={cn('flex', 'w-full', 'relative', 'h-full', 'justify-center', 'items-center', 'pb-[4rem]')}>
          <div className={cn('flex', 'w-[60rem]', 'flex-col', 'h-[35rem]')}>
            <Chart
              moodToNumber={graphDetails[0].moodToNumber}
              messages={graphDetails[0].messages}
              age={graphDetails[0].age}
              moodToNumber2={graphDetails[1].moodToNumber}
              messages2={graphDetails[1].messages}
              age2={graphDetails[1].age}
              />
          </div>
        </div>
      )}
    </>
  );
}