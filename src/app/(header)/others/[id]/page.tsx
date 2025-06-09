'use client'

import { DownArrow } from "@/assets/svg";
import Chart from "@/components/Chart";
import DetailTextBox from "@/components/DetailTextBox";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

const DATA_MAP: Record<string, {
  name: string;
  moodToNumber: string[];
  messages: string[];
  age: number[];
}> = {
  "0": {
    name: "김재균",
    moodToNumber: ['-5', '2', '0', '2', '5'],
    messages: [
      '세상이 무너지는 줄 알았어. 그땐 정말 힘들었거든.',
      '조금씩 괜찮아지고 있었어. 뭔가 희망이 보였지.',
      '마냥 좋지도, 나쁘지도 않은 하루하루였어.',
      '내가 하고 싶은 걸 찾아가는 시기였어. 꽤 괜찮았지.',
      '모든 게 잘 맞아떨어졌어. 정말 행복했어.',
    ],
    age: [11, 14, 18, 20, 25],
  },
  "1": {
    name: "엄지성",
    moodToNumber: ['3', '-2', '-5', '1', '4'],
    messages: [
      '그때는 모든 게 새롭고 즐거웠어. 세상이 궁금했지.',
      '많이 지치고 방황했어. 방향을 잃은 기분이었거든.',
      '그 시기는 정말 힘들었어. 뭐든 포기하고 싶었어.',
      '조금씩 회복하고 있었어. 다시 시작할 용기를 냈지.',
      '지금은 내가 나답게 살아가는 느낌이야. 꽤 괜찮아.',
    ],
    age: [9, 13, 16, 21, 26],
  },
  "2": {
    name: "김주은",
    moodToNumber: ['0', '1', '4', '5', '3'],
    messages: [
      '평범한 하루하루였어. 특별하지도 않았지만 괜찮았어.',
      '조금씩 내 감정을 표현하기 시작했어.',
      '하고 싶은 걸 하며 삶이 빛나기 시작했지.',
      '정말 찬란한 시기였어. 나 자신이 자랑스러웠거든.',
      '여전히 즐겁지만, 조금은 차분해진 지금이 좋아.',
    ],
    age: [10, 12, 17, 22, 28],
  },
};

export default function DetailGraphPage() {
  const { id } = useParams() as { id: string };
  const data = DATA_MAP[id];

  const scrollToElement = (element: string) => {
    document.querySelector(element)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTextBox = () => {
    scrollToElement('#textBox');
  };

  return (
    <>
      <div className={cn('flex', 'w-full', 'h-[calc(100vh-6rem)]', 'justify-center', 'items-center', 'flex-col')}>
        <div className={cn('flex', 'relative', 'w-full', 'h-full', 'justify-center', 'items-center', 'flex-col')}>
          <div className={cn('flex', 'flex-col', 'w-full', 'items-center', 'justify-center')}>
            <p className={cn('text-3xl', 'font-bold')}>김재균님의 인생 그래프</p>
            <div className={cn('flex', 'w-[60rem]', 'flex-col', 'h-[35rem]')}>
              <Chart
                moodToNumber={data.moodToNumber}
                messages={data.messages}
                age={data.age}
              />
            </div>
            <div onClick={scrollToTextBox} className={cn('absolute', 'bottom-0', 'flex', 'flex-col', 'items-center', 'gap-[0.25rem]', 'cursor-pointer')}>
              <p className={cn('text-md')}>스크롤 해서 텍스트로 보기</p>
              <div className={cn('animate-bounce')}>
                <DownArrow/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DetailTextBox 
        name={data.name}
        messages={data.messages}
        age={data.age}
      />
    </>
  )
}