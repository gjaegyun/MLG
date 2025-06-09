'use client'

import GraphIcon from '@/assets/images/GraphIcon.png';
import Image from 'next/image'
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const Section2 = () => {
  const { ref, isInView } = useInView(0.3);

  return (
    <div
      id="section2"
      className={cn('flex', 'w-full', 'relative', 'h-full', 'justify-center', 'items-center', 'pb-[4rem]')}
    >
      <div className={cn('flex', 'justify-center', 'items-center', 'absolute')}>
        <Image
          src={GraphIcon}
          alt="GraphLogo"
          style={{ objectFit: 'contain' }}
          className="blur-sm opacity-50"
        />
      </div>
      <div
        ref={ref}
        className={cn(
          'flex', 'flex-col', 'gap-[3rem]',
          'transition-all', 'duration-700',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        <p className={cn('text-5xl', 'font-bold')}>
          My Life Graph는 어떤 서비스인가요?
        </p>
        <p className={cn('text-xl', 'w-[50rem]')}>
          My Life Graph는 당신의 인생을 한눈에 들여다볼 수 있는 특별한 그래프를 만들어주는 서비스입니다. 과거의 순간들, 감정의 기복, 삶의 전환점을 직접 기록하고 시각화해보세요. 나만의 인생 곡선을 그리고, 다른 사람들의 그래프도 보며 공감하고 새로운 인사이트를 얻을 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default Section2;