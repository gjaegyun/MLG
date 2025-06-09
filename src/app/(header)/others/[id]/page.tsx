'use client'

import { DownArrow } from "@/assets/svg";
import Chart from "@/components/Chart";
import { cn } from "@/lib/utils";

export default function DetailGraphPage() {

  const scrollToElement = (element: string) => {
    document.querySelector(element)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToSection2 = () => {
    scrollToElement('#section2');
  };

  return (
    <div className={cn('flex', 'relative', 'w-full', 'h-[calc(100vh-6rem)]', 'justify-center', 'items-center', 'flex-col')}>
      <div className={cn('flex', 'flex-col', 'w-full', 'items-center', 'justify-center')}>
        <p className={cn('text-3xl', 'font-bold')}>김재균님의 인생 그래프</p>
        <div className={cn('flex', 'w-[60rem]', 'flex-col', 'h-[35rem]')}>
          <Chart
            moodToNumber={['-5', '2', '0', '2', '5']}
            messages={['안녕하세요1', '안녕하세요2', '안녕하세요3', '안녕하세요4', '안녕하세요5']}
            age={[11, 14, 18, 20, 25]}/>
        </div>
        <div onClick={scrollToSection2} className={cn('absolute', 'bottom-0', 'flex', 'flex-col', 'items-center', 'gap-[0.25rem]', 'cursor-pointer')}>
          <p className={cn('text-md')}>스크롤 해서 텍스트로 보기</p>
          <div className={cn('animate-bounce')}>
            <DownArrow/>
          </div>
        </div>
      </div>
    </div>
  )
}