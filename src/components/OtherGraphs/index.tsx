'use client'

import { DetailArrow } from "@/assets/svg"
import { cn } from "@/lib/utils"
import BarGraphIcon from '@/assets/images/BarGraphIcon.png';
import Image from 'next/image'
import { useRouter } from "next/navigation";

interface OtherGraphsType {
  name: string;
  id: number;
}

const OtherGraphs = ({name, id} : OtherGraphsType) => {

  const { push } = useRouter();

  const onDetailPageClicked = () => {
    push(`/others/${id}`)
  }

  return (
    <div className={cn('w-[26.25rem]', 'bg-white', 'h-[27.5625rem]', 'flex', 'items-center', 'justify-between', 'flex-col', '[box-shadow:0px_4px_40px_0px_rgba(175,198,209,0.20)]', 'rounded-xl','transition-all',
    'duration-300',
    'ease-in-out',
    'hover:-translate-y-3')}>
        <Image
          src={BarGraphIcon}
          alt="BarGraphLogo"
          style={{ objectFit: 'contain' }}
          className="opacity-50 blur-sm"
        />
      <div className={cn('flex', 'w-full', 'h-full', 'p-[2rem]', 'pt-0', 'flex-col', 'justify-between')}>
        <div className={cn('flex', 'w-full', 'flex-col', 'gap-[0.75rem]')}>
          <p className={cn('text-xl', 'font-bold', 'text-start')}>{name}의 인생그래프</p>
          <p className={cn('text-md')}>“{name}의 삶의 여정을 그래프로 시각화했습니다. 어떤 순간에 가장 큰 변화를 겪었는지 확인해보세요.”</p>
        </div>

        <button onClick={() => onDetailPageClicked()} className={cn('flex', 'gap-[0.5rem]', 'items-center', 'cursor-pointer')}>
          <p className={cn('text-md', 'text-[#9E9E9E]', 'font-bold')}>자세히 보기</p>
          <DetailArrow/>
        </button>
      </div>
    </div>
  )
}

export default OtherGraphs