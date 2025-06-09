'use client'

import { DownArrow } from "@/assets/svg";
import Section2 from "@/components/Section2";
import { cn } from "@/lib/utils";

export default function MainPage() {

  const scrollToElement = (element: string) => {
    document.querySelector(element)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToSection2 = () => {
    scrollToElement('#section2');
  };

    return (
      <>
        <div className={cn('flex', 'w-full', 'h-[calc(100vh-6rem)]', 'justify-center', 'items-center', 'flex-col')}>
          <div className={cn('flex', 'w-full', 'h-full', 'justify-center', 'items-center', 'relative')}>
            <div className={cn('flex', 'gap-[2rem]', 'justify-center', 'items-center', 'flex-col', 'font-bold')}>
              <p className={cn('text-6xl')}>
                내 인생의 흐름, 한눈에 보기
              </p>

              <p className={cn('text-2xl')}>
                그래프로 정리하는 당신만의 이야기
              </p>
            </div>

            <div onClick={scrollToSection2} className={cn('absolute', 'bottom-0', 'flex', 'flex-col', 'items-center', 'gap-[0.25rem]', 'cursor-pointer')}>
              <p className={cn('text-md')}>스크롤 해서 더 알아보기</p>
              <div className={cn('animate-bounce')}>
              <DownArrow/>
              </div>
            </div>
          </div>
        </div>
        

        <Section2/>
      </>
    );
  }
  