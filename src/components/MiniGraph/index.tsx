'use client'

import { cn } from "@/lib/utils"
import Image from "next/image"

import GraphIcon from '@/assets/images/GraphIcon.png';

interface MiniGraphProps {
  name: string;
  selected?: boolean;
}

const MiniGraph = ({ name, selected = false }: MiniGraphProps) => {
  return (
    <div
      className={cn(
        'rounded-lg',
        'bg-white',
        'flex',
        'justify-center',
        'items-center',
        'p-2',
        'gap-4',
        'transition-colors',
        'duration-200',
        selected
          ? 'border border-blue-500 bg-blue-50'
          : 'border border-neutral-400'
      )}
    >
      <div className="w-20 h-20 rounded-full bg-[#f5f5f5] flex items-center justify-center">
        <Image
          src={GraphIcon}
          alt="GraphLogo"
          width={48}
          height={48}
        />
      </div>
      <div>
        <p className={cn('text-xl')}>{name}의</p>
        <p className={cn('text-xl')}>인생그래프</p>
      </div>
    </div>
  );
};

export default MiniGraph